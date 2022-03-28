import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as S from './styles'
import Logo from  '../../assets/logo.svg'

const NormalLoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <S.Container>
      <S.ContainerForm>
        <S.Image src={Logo} alt="icon" />
        <S.Text>Motok Administrativo</S.Text>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: 'Insira um Email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuário" />
          </Form.Item>
          <Form.Item
            name="senha"
            rules={[{ required: true, message: 'Insira a senha' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item>
            <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
              Entrar
            </S.ButtonForm>
          </Form.Item>
        </Form>
      </S.ContainerForm>
    </S.Container>
  
  );
};

export default NormalLoginForm