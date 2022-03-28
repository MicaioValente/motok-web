import React, { useState } from 'react';
import Home from '../../components/Home';
import { FaPen } from 'react-icons/fa'
import { Modal, Form, Input, Table, Tag, Checkbox, Select, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { Tabs } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { FormPf } from '../../components/NovoClienteForm';
import { FormCnpj } from '../../components/NovoClienteFormCnpj';

const { TabPane } = Tabs;

export default function Clientes() {  
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
      content: 'Deseja Excluir o Plano?',
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
      title: 'Cpf',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Plano',
      dataIndex: 'plano',
      key: 'plano',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        let color
          if(status == 'Desativado'){
            color = '#2C3034'
          }else if(status == 'Aprovado'){
            color = '#00ff00'
          }else if(status == 'Em análise'){
            color = '#ffff00'
          }
            return (
              <Tag color={color} style={{borderRadius: '4px', color: color == '#ffff00' ? '#000' : '#fff', fontWeight: 'bold'}}>
                {status.toUpperCase()}
              </Tag>
            );
          }
    },
    {
      title: 'Ação',
      render: (Ação: string) => (
        <FaPen onClick={() => setModal(!modal)} color='#F14902' style={{cursor: 'pointer'}}/>
      ),
    },
    {
      title: 'Ativo',
      render:(Ação: string) =>  (
        <Checkbox />
      ),
    },
  ];

  const data = [
    {
      key: '1',
      cod: '111',
      name: 'John Brown',
      cpf: '123.123.132-44',
      email: 'teste@gmail.com',
      plano: 'Semanal',
      status: 'Desativado',
    },
    {
      key: '2',
      cod: '2222',
      name: 'John brabo',
      cpf: '123.123.132-44',
      email: 'teste@gmail.com',
      plano: 'Mensal',
      status: 'Aprovado',
    },
    {
      key: '3',
      cod: '2222',
      name: 'John brabo',
      cpf: '123.123.132-44',
      email: 'teste@gmail.com',
      plano: 'Diatrio',
      status: 'Em análise',
    },
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['5']} container={['aplicativos']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Planos
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.ContainerModal style={{justifyContent: 'flex-end'}}>
          <S.SearchContainer placeholder="input search text" onSearch={onSearch} enterButton />
      </S.ContainerModal>
      <S.Container >
        <Table columns={columns} dataSource={data} />
      </S.Container> 
    </Home>

    <S.ModalComponent footer={null} title="Novo plano" visible={modal} onOk={handleOk} onCancel={() => setModal(!modal)}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Cliente Pessoa Física" key="1">
          <FormPf onFinish={onFinish}/>
        </TabPane>
        <TabPane tab="Cliente Pessoa Jurídica" key="2">
          <FormCnpj onFinish={onFinish}/>
        </TabPane>
      </Tabs>
    </S.ModalComponent>
  </>
)}