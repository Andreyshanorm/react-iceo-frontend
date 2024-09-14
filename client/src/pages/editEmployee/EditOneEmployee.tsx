import React, { useState } from 'react'
import { EmployeeForm } from '../../components/EmployeeForm/EmployeeForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditOneMutation, useGetOneQuery } from '../../app/services/employees'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { Employee } from '@prisma/client'
import { paths } from '../../paths'
import { Row } from 'antd'
import { Layout } from '../../components/Layout/Layout'





export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>();
 const [error, setError] = useState('')
 const { data, isLoading } = useGetOneQuery(params.id || "");
  const [editEmployee] = useEditOneMutation()

 const handleEditUser = async (employee: Employee) => {

  try {
      const editedEmployee = {
        ...data,
        ...employee
      }

      await editEmployee(editedEmployee).unwrap()
      navigate(`${paths.status}/edited`)
  } catch (error) {
      const hasError = isErrorWithMessage(error)
      if(hasError){
          setError(error.data.message)
      } else setError('Неизвестная ошибка')
  }
}

  return (
    <Layout>
      <Row align='middle' justify='center'>
      <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
      
    </Layout>
    
  )
}
