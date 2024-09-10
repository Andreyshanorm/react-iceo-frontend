import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Header } from 'antd/es/layout/layout'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/EmployeeForm/EmployeeForm'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddOneMutation } from '../../app/services/employees'
import { paths } from '../../paths'
import { Employee } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'

export const AddEmployee = () => {

    const [error, setError] = useState('')
    const navigate = useNavigate()
    const isAuth = useSelector(selectUser)

    const [addEmployee] = useAddOneMutation()

    useEffect(() => {
        if(!isAuth){
            navigate(paths.login)
        }
    }, [isAuth, navigate])


    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap();

            navigate(`${paths.status}/created`)
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
            <EmployeeForm title='Добавить сотрудника' btnText='Добавить' onFinish={handleAddEmployee}/>
        </Row>
    </Layout>
  )
}
