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
    const handleFinish = (values : any) => {
        const formData = new FormData();
        
        // Добавляем текстовые поля
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('age', values.age);
        formData.append('role', values.role);
        
        // Добавляем файл
        if (values.photo && values.photo.file) {
          formData.append('photo', values.photo.file.originFileObj);
        }
    }
        // Отправка данных на сервер



  return (
    <Card style={{width: '30rem'}} title={title}>
        <Form  name='addEmployee' onFinish={onFinish} initialValues={employee}>
            <CustomInput type='text' name='firstName' placeholder='Введите имя'/>
            <CustomInput type='text' name='lastName' placeholder='Введите фамилию'/>
            <CustomInput type='text' name='age' placeholder='Введите возраст'/>
            <CustomInput type='text' name='role' placeholder='Введите должность'/>
            <CustomInput type='url' name='photo' placeholder='Выберете ссылку на фото фото'/>
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
