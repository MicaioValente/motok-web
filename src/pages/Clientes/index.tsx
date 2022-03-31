import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { Modal, Table, Tag, Checkbox, Select, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { Tabs } from 'antd';
import FormPf from '../../components/NovoClienteForm';
import FormCnpj from '../../components/NovoClienteFormCnpj';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { Cliente } from './types';
import moment from 'moment';

export default function Clientes() {  
  const [ modal, setModal] = useState(false)
  const [ modalPf, setModalPf] = useState(false)
  const [ modalPj, setModalPj] = useState(false)
  const [form] = Form.useForm();
  const [ data, setData ] = useState<Cliente[]>([] as Cliente[])
  const [ itemModal, setItemModal] = useState<Cliente>({} as Cliente)
  const { TabPane } = Tabs;
  const [ defaultActiveKey, setDefaultActiveKey] = useState("1")
  const [ trigger, setTrigger] = useState(false)

  useEffect(() => {
    async function getClientes() {
    await api.get(`clientes`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Clientes')
      });
    }
    getClientes();
  }, [trigger]);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Cliente)
    }
  }, [modal])

  const { Option } = Select;
  const onFinish = (values: any) => {
    if(values.cnpjCliente){
      values.dataAberturaEmpresaCliente = values.dataAberturaEmpresaCliente.format()
      values.docCarteiraMotorista = ''
      values.docComprovanteResidencia = ''
      values.anoNascimento = ''
      values.diaNascimento = ''
      values.mesNascimento = ''
      values.nomeMae = ''
      values.nomePai = ''
      values.cpfCliente = ''
      let obj = {
        codigoCliente: "12345",
      }
      let dataRequest = Object.assign(obj, values)
      if(itemModal?.idCliente){
        onEdit(dataRequest)
        return
      }

      api.post('clientes/pj', dataRequest ).then(function(response) {
        setTrigger(!trigger)
        setModal(false)
      }).catch(function(response) {
        toast.error('Cliente não foi salvo com sucesso')
      })
      return
    };

    let obj = {
      dataAberturaEmpresaCliente: "",
      inscricaoEstadualCliente: "",
      codigoCliente: "12345",
    }
      let dataRequest = Object.assign(obj, values)
      dataRequest.docCarteiraMotorista = ''
      dataRequest.docComprovanteResidencia = ''

    if(itemModal?.idCliente){
      onEdit(dataRequest)
      return
    }
    

    api.post('clientes/pf', dataRequest ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
      toast.success('Cliente Salvo')
    }).catch(function(response) {
      toast.error('Cliente não foi salvo com sucesso')
      })
    };
  
  const onEdit = (values: Cliente) => {
    if(values.cnpjCliente){
      let valor = {
        idCliente: itemModal.idCliente,
        ativo: 0,
        tipoClienteId: values.cnpjCliente ? 2 : 1,
      }
      const dataRequest = Object.assign(values, valor)
      dataRequest.inscricaoEstadualCliente = dataRequest.inscricaoEstadualCliente ? dataRequest.inscricaoEstadualCliente : ''
      dataRequest.dataAberturaEmpresaCliente = dataRequest.dataAberturaEmpresaCliente ? dataRequest.dataAberturaEmpresaCliente : ''
      api.put('clientes', dataRequest ).then(function(response) {
        setTrigger(!trigger)
        setModal(false)
        setModalPj(false)
        setModalPf(false)
  
      }).catch(function(response) {
        toast.error('Cliente não editado salvo com sucesso')
        })  
        return
    }

    let valor = {
      idCliente: itemModal.idCliente,
      cnpjCliente: '',
      ativo: 0,
      tipoClienteId: values.cnpjCliente ? 2 : 1,
    }
    
    const dataRequest = Object.assign(values, valor)
    dataRequest.inscricaoEstadualCliente = dataRequest.inscricaoEstadualCliente ? dataRequest.inscricaoEstadualCliente : ''
    dataRequest.dataAberturaEmpresaCliente = dataRequest.dataAberturaEmpresaCliente ? dataRequest.dataAberturaEmpresaCliente : ''
    console.log({dataRequest})
    api.put('clientes', dataRequest ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
      setModalPj(false)
      setModalPf(false)

    }).catch(function(response) {
      toast.error('Cliente não foi editado com sucesso')
      })  
  };
  
  
  function callback(key: any) {
  }


  function confirm(id: any) {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir o Cliente?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
    });
  }

  function handleDelete(id: any) {
    api.delete(`clientes/${id}` ).then(function(response) {
      toast.success('Cliente excluido')
      setData(data.filter(item => item.idCliente !== id))
    }).catch(function(response) {
      toast.error('Cliente não foi excluido')
    })
  }

  const setModalAndItem = (item:Cliente) => {
    if(item.cnpjCliente){
      item.dataAberturaEmpresaCliente = moment(item.dataAberturaEmpresaCliente)
      setModalPj(!modalPj)
      form.setFieldsValue(item)
      setItemModal(item)
      return
    }
    setModalPf(!modalPf)
    form.setFieldsValue(item)
    setItemModal(item)
  }

  console.log({data})
  const columns = [
    {
      title: 'Cód',
      dataIndex: 'codigoCliente',
      key: 'codigoCliente',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Nome',
      dataIndex: 'nomeCliente',
      key: 'nomeCliente',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'CPF/CNPJ',
      dataIndex: 'cpfCliente',
      key: 'cpfCliente',
      render: (text: string, item: Cliente) => <a>{item.cpfCliente != '' ? item.cpfCliente : item.cnpjCliente}</a>,

    },
    {
      title: 'Email',
      dataIndex: 'emailCliente',
      key: 'emailCliente',
    },
    {
      title: 'Plano',
      dataIndex: 'plano',
      key: 'plano',
      render: (text: string) => <a>{text ? text : 'Sem Plano'}</a>,

    },
    {
      title: 'Status',
      key: 'aprovacaoId',
      dataIndex: 'aprovacaoId',
      render: (status: number) => {
        let color
        let decricao = ''
          if(status == 4){
            color = '#2C3034'
            decricao = 'Desativado'
          }else if(status == 1){
            color = '#00ff00'
            decricao = 'Aprovado'
          }else if(status == 3){
            color = '#ffff00'
            decricao = 'Em análise'
          }
            return (
              <Tag color={color} style={{borderRadius: '4px', color: color == '#ffff00' ? '#000' : '#fff', fontWeight: 'bold'}}>
                {decricao.toUpperCase()}
              </Tag>
            );
          }
    },
    {
      title: 'Ação',
      key: 'ativo',
      dataIndex: 'ativo',
      render: (value:any, item: Cliente ) => (<>
        <FaPen onClick={() => setModalAndItem(item)} color='#F14902' style={{cursor: 'pointer', marginRight: '15px'}}/>
        <FaTrashAlt  onClick={() => confirm(item.idCliente)}  color='#696969' style={{cursor: 'pointer'}} />
      </>
      ),
    },
    {
      title: 'Ativo',
      key: 'ativo',
      dataIndex: 'ativo',
      render:(ativo: number) =>  (
        <Checkbox checked={ativo == 1}/>
      ),
    },
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['5']} container={['aplicativos']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
        Clientes
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.ContainerModal style={{justifyContent: 'flex-end'}}>
          <S.SearchContainer placeholder="input search text" onSearch={onSearch} enterButton />
      </S.ContainerModal>
      <S.Container >
        {data.length > 0 &&
          <Table columns={columns} dataSource={data} />
        }
      </S.Container> 
    </Home>

    <S.ModalComponent footer={null} title={itemModal?.idCliente ? 'Editar Cliente' : 'Novo Cliente'} visible={modal} onCancel={() => setModal(!modal)}>
      <Tabs defaultActiveKey={itemModal.cnpjCliente? '2' : '1'} onChange={callback}>
        <TabPane tab="Cliente Pessoa Física" key="1">
          <FormPf form={form} onFinish={onFinish} itemModal={itemModal}/>
        </TabPane>
        <TabPane tab="Cliente Pessoa Jurídica" key="2">
          <FormCnpj form={form} onFinish={onFinish} itemModal={itemModal}/>
        </TabPane>
      </Tabs>
    </S.ModalComponent>

    <S.ModalComponent footer={null} title={itemModal?.idCliente ? 'Editar Cliente' : 'Novo Cliente'} visible={modalPf} onCancel={() => setModalPf(!modalPf)}>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab="Cliente Pessoa Física" key="1">
          <FormPf form={form} onFinish={onFinish} itemModal={itemModal}/>
        </TabPane>
        <TabPane tab="Cliente Pessoa Jurídica" key="2" disabled>
          <FormCnpj form={form} onFinish={onFinish} itemModal={itemModal}/>
        </TabPane>
      </Tabs>
    </S.ModalComponent>

    <S.ModalComponent footer={null} title={itemModal?.idCliente ? 'Editar Cliente' : 'Novo Cliente'} visible={modalPj} onCancel={() => setModalPj(!modalPj)}>
      <Tabs defaultActiveKey='2' onChange={callback}>
        <TabPane tab="Cliente Pessoa Física" key="1" disabled>
          <FormPf form={form} onFinish={onFinish} itemModal={itemModal}/>
        </TabPane>
        <TabPane tab="Cliente Pessoa Jurídica" key="2">
          <FormCnpj form={form} onFinish={onFinish} itemModal={itemModal}/>
        </TabPane>
      </Tabs>
    </S.ModalComponent>
  </>
)}
