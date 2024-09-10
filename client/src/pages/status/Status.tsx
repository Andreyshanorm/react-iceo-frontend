import { Button, Result, Row } from 'antd'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const StatusTypes: Record<string, string> = {
    created: 'Пользователь создан',
    updated: 'Пользователь удалён',
    deleted: 'Пользователь удалён'
}


export const Status = () => {

    const { status } = useParams()

  return (
    <Row align='middle' justify='center' style={{width: '100%'}}>
        <Result status={status ? 'success' : 404} title={status ? StatusTypes[status] : 'Не найдено'} extra={
            <Button key='dash'>
                <Link to={'/'}>На главную</Link>
            </Button>
        }/>
    </Row>
  )
}
