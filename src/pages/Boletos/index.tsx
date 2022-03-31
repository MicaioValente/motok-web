import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import { Modal, Form, Input, Table,Select, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { AiOutlineFilePdf, AiOutlineBarcode, AiOutlineQrcode} from 'react-icons/ai'
import { Cliente } from '../Clientes/types';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { Planos } from '../Planos';

export type Boleto = {
  codigoPagamento: string
  formaPagamento: string
  dataEmissao: string
  dataVencimento: string
  statusPagamento: string
  urlBoleto: string
  valor: number
  imagemBase64QrCode: string
  codigoCopiaEColaPix: string
  client: Cliente
}

export default function Notificacoes() {  
  const [ modal, setModal] = useState(false)
  const [ data, setData ] = useState<Boleto[]>([] as Boleto[])
  const [ clientes, setClientes ] = useState<Cliente[]>([] as Cliente[])
  const [ planos, setPlanos ] = useState<Planos[]>([] as Planos[])
  const { Option } = Select;
  const [form] = Form.useForm();
  const [ itemModal, setItemModal] = useState<Boleto>({} as Boleto)
  const [ trigger, setTrigger] = useState(false)

  useEffect(() => {
    async function getBoleto() {
      await api.get(`boleto`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Pagamentos')
      });
    }
    getBoleto();
  }, [trigger]);

  useEffect(() => {
    async function getBoleto() {
    await api.get(`clientes`)
    .then(response => {
      setClientes(response.data)
    }).catch(function (error) {
      toast.error('Erro ao buscar clientes')
    });
    await api.get(`planos`)
    .then(response => {
      setPlanos(response.data)
    }).catch(function (error) {
      toast.error('Erro ao buscar planos')
    });
  } 
  getBoleto()
  }, [])

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Boleto)
    }
  }, [modal])


  const onFinish = (values: any) => {
    console.log({values})
    if(itemModal?.dataEmissao){
      onEdit(values)
      return
    }
    api.post('boleto', values ).then(function(response) {
    console.log({response})
    // setTrigger(!trigger)
    //   setModal(false)
    }).catch(function(response) {
      toast.error('Pagamento não foi cadastrado com sucesso')
    })
  };

  const onEdit = (values: Cliente) => {
    console.log({values})
    api.put('clientes', values ).then(function(response) {
      setTrigger(!trigger)

    }).catch(function(response) {
      toast.error('Cliente não foi editado com sucesso')
      })  
  };


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
      title: 'Cód',
      dataIndex: 'codigoPagamento',
      key: 'codigoPagamento',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Tipo',
      dataIndex: 'codigoCopiaEColaPix',
      key: 'codigoCopiaEColaPix',
      render: (text: string) => <a>{text ? 'Pix' : 'Boleto'}</a>,
    },
    {
      title: 'Data emissão',
      dataIndex: 'dataEmissao',
      key: 'dataEmissao',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Data Vencimento',
      dataIndex: 'dataVencimento',
      key: 'dataVencimento',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
      key: 'client',
      render: (text: Cliente) => <a>{text?.nomeCliente}</a>,
    },
    {
      title: 'CPF/CNPJ',
      dataIndex: 'client',
      key: 'client',
      render: (item: Cliente) => <a>{item?.cpfCliente != '' ? item?.cpfCliente : item?.cnpjCliente}</a>,
    },
    {
      title: 'Status Pagamento',
      key: 'statusPagamento',
      // align: 'center',
      dataIndex: 'statusPagamento',
      render: (status: string) => {
        let color
        let decricao = ''
          if(status == "pending"){
            color = '#ffff00'
            decricao = 'Pendente'
          }else if(status == "aaaa"){
            color = '#00ff00'
            decricao = 'Aprovado'
          }else if(status == "aaaaa"){
            color = '#2C3034'
            decricao = 'Em análise'
          }
            return (
              <Tag color={color} style={{borderRadius: '4px', color: color == '#ffff00' ? '#000' : '#fff', fontWeight: 'bold', fontSize:'10px'}}>
                {decricao.toUpperCase()}
              </Tag>
            );
          }
    },
    {
      title: 'Ações',
      dataIndex: 'client',
      key: 'client',
      render: (Ação: string, item: Boleto) => {
        if(item.codigoCopiaEColaPix){  
          return(
          <>
            <AiOutlineBarcode style={{cursor: 'pointer',width: '20px', height:'20px', marginRight: '5px'}}/>
            <AiOutlineQrcode style={{cursor: 'pointer',width: '20px', height:'20px'}}/>
          </>
          )
        }else{
          return(
              <AiOutlineFilePdf onClick={() => setModal(!modal)} color='#fff' style={{cursor: 'pointer',width: '20px', height:'20px', marginRight: '5px'}}/>
            )
        }
      },
    }
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['9']} container={['aplicativos']}>
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

    <S.ModalComponent footer={null} title="Novo Boleto" visible={modal} onCancel={() => setModal(!modal)}>
    <S.ContainerForm>
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="formaPagamento"
              label="Selecione uma opção de pagamento"
              hasFeedback
            >
              <Select>
                <Option value={0}>Boleto</Option>
                <Option value={1}>PIX</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="clientId"
              label="Selecione um cliente"
              hasFeedback
            >
              <Select >
              {clientes.length > 0 &&
                  clientes.map((item, index) => (
                  <Option value={item.idCliente}>{item.nomeCliente}</Option>
                )) }
              </Select>
            </Form.Item>

            <Form.Item
              name="planoId"
              label="Selecione um Plano"
              hasFeedback
            >
              <Select >
              {planos.length > 0 &&
                  planos.map((item, index) => (
                  <Option value={item.idPlanos}>{item.nomePlano + ' - ' + item.valorSemanal + ' - ' + item.valorCaucao}</Option>
                )) }
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