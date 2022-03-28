import React, { useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function Planos() {  
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
      content: 'Deseja Excluir o Plano?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => console.log('asdasda')
    });
  }

  return (
  <>
    <Home selected={['2']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Planos
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title style={{fontWeight: '500'}}> Plano Anual - 41,90</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt  onClick={confirm}  color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
        </S.Box>  

        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title style={{fontWeight: '500'}}> Plano Anual - 41,90</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt  onClick={confirm}  color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
        </S.Box>

        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title style={{fontWeight: '500'}}> Plano Anual - 41,90</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModal(!modal)} color='#F14902'/>
              <FaTrashAlt  onClick={confirm}  color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
        </S.Box>

      </S.Container> 
    </Home>
    <S.ModalComponent footer={null} title="Novo plano" visible={modal} onOk={handleOk} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
        <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
                label="Nome do plano"
                name="nome"
            >
              <Input  />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Preço do plano"
                name="year"
                rules={[{  message: 'Insira o Preço!'}]}
                style={{ display: 'inline-block', width: 'calc(23% - 8px)' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Tipo de pagamento"
                name="month"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)', margin: '0 8px' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Valor semanal"
                name="month"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)', margin: '0 8px' }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Valor do Calção"
                name="month"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)', margin: '0 8px' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item name={'Descrição do plano'} label="Observação do plano">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>

              <Form.Item name={ 'Observação do plano'} label="Observação do plano">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                Cadastrar novo plano
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}
