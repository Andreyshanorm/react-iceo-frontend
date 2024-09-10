import React, { useEffect } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import styles from './Employees.module.css'
import { useGetAllQuery } from '../../app/services/employees'
import { EmployeesList } from './employeesList/EmployeesList'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../paths'



export const Employees: React.FC  = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)


  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [navigate, user])

  const { data, isLoading } = useGetAllQuery()
  
  return (
    <Layout>
      <Button type='primary' onClick={() => navigate(paths.employeeAdd)} icon={<PlusCircleFilled/>}>
        Добавить сотрудника
      </Button>
      <div className={styles.personList}>
        <EmployeesList employees={data}/>
      </div>
    </Layout>
  )
}
