import React, { useCallback } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as S from './styles'
import Logo from  '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth';
import api from '../../service/api';
import { useNavigate } from 'react-router-dom';

const NormalLoginForm = () => {
  const { signIn } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await signIn({
          email: values.email,
          password: values.password,
        });

        navigate('/');
      } catch (error) {
        
      }
    },
    [signIn, navigate],
  );

  return (
    <S.Container>
      <S.ContainerForm>
        <S.Image src={Logo} alt="icon" />
        <S.Text>Motok Administrativo</S.Text>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={values => handleSubmit(values)}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Insira um Email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
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

export default NormalLoginForm;
