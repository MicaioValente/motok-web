import React, { useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function Perguntas() {  
  const [ modal, setModal] = useState(false)
  const { TextArea } = Input;
  function handleOk() {
    
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  function confirm() {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Pergunta?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => console.log('asdasda')
    });
  }

  return (
  <>
    <Home selected={['3']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Perguntas
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Nova +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title style={{fontWeight: '500'}}>Perfunta teste teste teste </S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt  onClick={confirm}  color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
        </S.Box>  

      </S.Container> 
    </Home>
    <S.ModalComponent footer={null} title="Responder Pergunta" visible={modal} onOk={handleOk} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
        <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
                label="Pergunta"
                name="pergunta"
            >
              <Input  />
            </Form.Item>
            <Form.Item
                label="Resposta"
                name="resposta"
            >
              <Input  />
            </Form.Item>

            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                Responder Pergunta
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}
