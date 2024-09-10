import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Row, Card, Form, Space, Button, Typography } from "antd";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";


export const Login = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const handleLoginSubmit = async (data: UserData) => {
    console.log(data);
    try {
      
      
      await loginUser(data).unwrap()
      navigate('/')
    } catch (error) {
      const Error = isErrorWithMessage(error)

      if(Error){
        setError(error.data.message)
      } else {
        setError('Unknown error')
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify='center'>
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={handleLoginSubmit}>
            <CustomInput
              type="email"
              name="email"
              placeholder="Введите email"
            />
            <PasswordInput name="password" placeholder="Введите пароль" />
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form>
          <div style={{paddingTop: '10px', width: '50%'}}>
            <ErrorMessage message={error}/>
          </div>
            <Space style={{paddingTop: '10px'}}>
              <Typography.Text >
                Нет аккаутна?{" "}
                <Link to={paths.registration}>Зарегестрируйтесь</Link>
              </Typography.Text>
            </Space>
        </Card>
      </Row>
    </Layout>
  );
};
