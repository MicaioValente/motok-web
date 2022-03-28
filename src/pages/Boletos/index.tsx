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
      content: 'Deseja Excluir a Moto?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => console.log('asdasda')
    });
  }


  const columns = [
    {
      title: 'Marca/Modelo',
      dataIndex: 'marca',
      key: 'marca',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Data cadastro',
      dataIndex: 'dataCadastro',
      key: 'dataCadastro',
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
      marca: 'John Brown',
      placa: '123.123. ',
      cliente: 'teste@gmail.com',
      dataCadastro: '2022-02-18 18:47:12',
    },
    {
      key: '1',
      cod: '111',
      marca: 'John Brown',
      placa: '123.123. ',
      cliente: 'teste@gmail.com',
      dataCadastro: '2022-02-18 18:47:12',
    },
    {
      key: '1',
      cod: '111',
      marca: 'John Brown',
      placa: '123.123. ',
      cliente: 'teste@gmail.com',
      dataCadastro: '2022-02-18 18:47:12',
    },
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['8']} container={['aplicativos']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Boleto
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

    <S.ModalComponent footer={null} title="Novo Boleto" visible={modal} onOk={handleOk} onCancel={() => setModal(!modal)}>
    <S.ContainerForm>
        <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="estatoClienteId"
              label="Selecione uma opção de pagamento"
              hasFeedback
            >
              <Select>
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="estatoClienteId"
              label="Selecione um cliente"
              hasFeedback
            >
              <Select >
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="estatoClienteId"
              label="Selecione o plano"
              hasFeedback
            >
              <Select >
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                Gerar boleto
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}