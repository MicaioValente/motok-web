import React, { useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function ImagesHome() {  
  const [ modal, setModal] = useState(false)

  function handleOk() {
    
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  function confirm() {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Imagem?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => console.log('asdasda')
    });
  }

  return (
  <>
    <Home selected={['1']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Imagens
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title> Moto1</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt  onClick={confirm}  color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
          <S.Image src={'https://motok.com.br/assets/images/slides/moto_workdb.png'}/>
        </S.Box>  

        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title> Moto2</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt onClick={confirm} color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
          <S.Image src={'https://motok.com.br/assets/images/slides/moto_workdb.png'}/>
        </S.Box>  

        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title> Moto3</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt  onClick={confirm} color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
          <S.Image src={'https://motok.com.br/assets/images/slides/moto_workdb.png'}/>
        </S.Box>  

      </S.Container> 
    </Home>
    <Modal footer={null} title="Trocar Imagem" visible={modal} onOk={handleOk} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="nome"
              rules={[{ required: true, message: 'Insira o Nome!' }]}
            >
              <Input  placeholder="Nome" />
            </Form.Item>
            <Form.Item
              name="image"
              rules={[{ required: true, message: 'Insira a imagem' }]}
            >
               <Upload >
                <S.ButtonForm style={{color: 'black'}} type="default" className="login-form-button">Enviar Imagem</S.ButtonForm>
              </Upload>
            </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                Entrar
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </Modal>
  </>
)}
