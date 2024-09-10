import { Employee } from '@prisma/client'
import { Button, Card, Form, Space } from 'antd'
import React from 'react'
import { CustomInput } from '../CustomInput/CustomInput'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

type Props<T> = {
    onFinish: (values: T) => void,
    btnText: string,
    title: string,
    error?: string,
    employee?: T
}

export const EmployeeForm = ( {onFinish, btnText, title, error, employee} : Props<Employee> ) => {
  return (
    <Card style={{width: '30rem'}} title={title}>
        <Form name='addEmployee' onFinish={onFinish} initialValues={employee}>
            <CustomInput type='text' name='firstName' placeholder='Введите имя'/>
            <CustomInput type='text' name='lastName' placeholder='Введите фамилию'/>
            <CustomInput type='text' name='age' placeholder='Введите возраст'/>
            <CustomInput type='text' name='role' placeholder='Введите должность'/>
            <Space>
                <ErrorMessage message={error}/>
                <Button htmlType='submit'>
                    {btnText}
                </Button>
            </Space>
        </Form>
    </Card>
  )
}
