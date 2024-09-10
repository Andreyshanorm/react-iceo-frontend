import React from 'react'
import { Layout } from "../../components/Layout/Layout";
import { Row, Card, Form, Space, Button, Typography } from "antd";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import { paths } from "../../paths";


export const Registration = () => {
  return (
    <Layout>
      <Row align="middle" justify='center'>
        <Card title="Регистрация" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput
              type="text"
              name="name"
              placeholder="Введите имя"
            />
            <CustomInput
              type="email"
              name="email"
              placeholder="Введите email"
            />
            <PasswordInput name="password" placeholder="Введите пароль" />
            <PasswordInput name="confirmPassword" placeholder="Повторите пароль" />
            <Button type="primary" htmlType="submit">
              Зарегестрироваться
            </Button>
          </Form>
            <Space style={{paddingTop: '10px'}}>
              <Typography.Text >
                Уже зарегестрированы?{" "}
                <Link to={paths.login}>Войдите</Link>
              </Typography.Text>
            </Space>
        </Card>
      </Row>
    </Layout>
  );
}
