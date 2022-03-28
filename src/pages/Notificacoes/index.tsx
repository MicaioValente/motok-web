import React, { useState } from 'react';
import Home from '../../components/Home';
import { Modal, Form, Input, Table, Tag, Checkbox, Select, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { Tabs } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { FormPf } from '../../components/NovoClienteForm';
import { FormCnpj } from '../../components/NovoClienteFormCnpj';
import { FaPen , FaTrashAlt} from 'react-icons/fa'

const { TabPane } = Tabs;

export default function Notificacoes() {  
  const [ modal, setModal] = useState(false)
  const { TextArea, Search  } = Input;
  function handleOk() {
    
  }
  const { Option } = Select;
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  function callback(key: any) {
    console.log(key);
  }


  function confirm() {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Notificação?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => console.log('asdasda')
    });
  }


  const columns = [
    {
      title: 'Cód',
      dataIndex: 'cod',
      key: 'cod',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Ação',
      render: (Ação: string) => (<>
        <FaPen onClick={() => setModal(!modal)} color='#F14902' style={{cursor: 'pointer', marginRight: '10px'}}/>
        <FaTrashAlt  onClick={confirm}  color='#696969'/>
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      cod: '111',
      name: 'John Brown',
      descricao: '123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 ',
      cliente: 'teste@gmail.com',
    },
    {
      key: '1',
      cod: '111',
      name: 'John Brown',
      descricao: '123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 ',
      cliente: 'teste@gmail.com',
    },
    {
      key: '1',
      cod: '111',
      name: 'John Brown',
      descricao: '123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 ',
      cliente: 'teste@gmail.com',
    },
    {
      key: '1',
      cod: '111',
      name: 'John Brown',
      descricao: '123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 123.123.132-44 ',
      cliente: 'teste@gmail.com',
    },
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['6']} container={['aplicativos']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Notificações
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Nova +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.ContainerModal style={{justifyContent: 'flex-end'}}>
          <S.SearchContainer placeholder="input search text" onSearch={onSearch} enterButton />
      </S.ContainerModal>
      <S.Container >
        <Table columns={columns} dataSource={data} />
      </S.Container> 
    </Home>

    <S.ModalComponent footer={null} title="Nova Notificação" visible={modal} onOk={handleOk} onCancel={() => setModal(!modal)}>
    <S.ContainerForm>
        <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
                label="Nome da notificação"
                name="nome"
            >
              <Input  />
            </Form.Item>
              <Form.Item name={'Descrição da Notificação'} label="Descrição da Notificação">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>

              <Form.Item
                name="estatoClienteId"
                label="Cliente que irá receber a notificação"
                hasFeedback
              >
                <Select placeholder="Escolha um cliente para notificar">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                Cadastrar nova notificação
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}