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

export default function Clientes() {  
  const [ modal, setModal] = useState(false)
  const [form] = Form.useForm();
  const [ data, setData ] = useState<Cliente[]>([] as Cliente[])
  const [ itemModal, setItemModal] = useState<Cliente>({} as Cliente)
  const { TabPane } = Tabs;
  const [ defaultActiveKey, setDefaultActiveKey] = useState("1")

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
  }, []);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Cliente)
    }
  }, [modal])

  const { Option } = Select;
  const onFinish = (values: any) => {
    if(values.cnpjCliente){
      api.post('clientes/pj', values ).then(function(response) {
        setModal(false)
      }).catch(function(response) {
        toast.error('Cliente não foi salvo com sucesso')
      })
      return
    };


    let obj = {
      anoNascimento: "2001",
      bairroEnderecoCliente: "aaa",
      cepEnderecoCliente: "89056-530",
      cidadeClienteId: "494",
      complementoEnderecoCliente: "aaaa",
      cpfCliente: "046.374.521-29",
      diaNascimento: "2",
      // docCarteiraMotorista: undefined,
      // docComprovanteResidencia: undefined,
      emailCliente: "micaiovalente@gmail.com",
      estatoClienteId: "12",
      mesNascimento: "10",
      nomeCliente: "aaaa",
      nomeMae: "mwe",
      nomePai: "pai",
      numEnderecoCliente: "231",
      ruaEnderecoCliente: "tamarindo",
      senhaCliente: "aaaaaaa",
      telefoneCliente: "(47) 9 8899-9033"
    };
    if(itemModal?.idCliente){
      onEdit(values)
      return
    }
    api.post('clientes/pf', values ).then(function(response) {
        setModal(false)
    }).catch(function(response) {
      toast.error('Cliente não foi salvo com sucesso')
      })
    };
  
    const onEdit = (values: Cliente) => {
      let valor = {
        idCliente: itemModal.idCliente,
      }
      const dataRequest = Object.assign(values, valor)
      api.put('clientes', dataRequest ).then(function(response) {
          setModal(false)
      }).catch(function(response) {
        toast.error('Cliente não foi salvo com sucesso')
        })  
    };
  
  
  function callback(key: any) {
  }


  function confirm(id: any) {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir o Plano?',
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
      setDefaultActiveKey('2')
    }
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }

  
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
        {data.length > 0 &&
          <Table columns={columns} dataSource={data} />
        }
      </S.Container> 
    </Home>

    <S.ModalComponent footer={null} title="Novo plano" visible={modal} onCancel={() => setModal(!modal)}>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={callback}>
        <TabPane tab="Cliente Pessoa Física" key="1">
          <FormPf form={form} onFinish={onFinish}/>
        </TabPane>
        <TabPane tab="Cliente Pessoa Jurídica" key="2">
          <FormCnpj form={form} onFinish={onFinish}/>
        </TabPane>
      </Tabs>
    </S.ModalComponent>
  </>
)}