import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import { Modal, Form, Input, Table, Select} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Cliente } from '../Clientes/types';
import api from '../../service/api';
import { toast } from 'react-toastify';

export type Notificacoes = {
  idNotificacao: 0
  nomeNotificacao: string
  descricaoNotificacao: string
  ativo: string
  cliente: Cliente
}


export default function Notificacoes() {  
  const [ modal, setModal] = useState(false)
  const { TextArea } = Input;
  const [ data, setData ] = useState<Notificacoes[]>([] as Notificacoes[])
  const [ clientes, setClientes ] = useState<Cliente[]>([] as Cliente[])
  const [form] = Form.useForm();
  const [ itemModal, setItemModal] = useState<Notificacoes>({} as Notificacoes)
  const { Option } = Select;
  const [ trigger, setTrigger] = useState(false)

  useEffect(() => {
    async function getDepoimento() {
    await api.get(`Notificacao`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Notificações')
      });
    await api.get(`clientes`)
      .then(response => {
        setClientes(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Clientes')
      });
    }
    getDepoimento();
  }, [trigger]);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Notificacoes)
    }
  }, [modal])


  function handleDelete(id: any) {
    api.delete(`Notificacao/${id}` ).then(function(response) {
      toast.success('Notificação excluida')
      setData(data.filter(item => item.idNotificacao!== id))
    }).catch(function(response) {
      toast.error('Notificação não foi excluida')
    })
  }

    function confirm(id: any) {
      Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Notificação?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
      })
    }

  const onFinish = (values: any) => {
    if(itemModal?.idNotificacao){
      onEdit(values)
      return
    }
    api.post('Notificacao', values ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
  }).catch(function(response) {
    toast.error('Notificação não foi salva com sucesso')
    })
  };

  const onEdit = (values: Notificacoes) => {
    api.put(`Notificacao/${itemModal.idNotificacao}`, values ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
    }).catch(function(response) {
      toast.error('Notificação não foi salva com sucesso')
      })  
  };

  const setModalAndItem = (item:Notificacoes) => {
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }

  const columns = [
    {
      title: 'nome',
      dataIndex: 'nomeNotificacao',
      key: 'nomeNotificacao',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricaoNotificacao',
      key: 'descricaoNotificacao',
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (text: string, item: Notificacoes) => <a>{item.cliente.nomeCliente}</a>,
    },
    {
      title: 'Ação',
      dataIndex: 'idNotificacao',
      key: 'idNotificacao',
      render: (Ação: string, item: Notificacoes) => (<>
        <FaPen onClick={() => setModalAndItem(item)} color='#F14902' style={{cursor: 'pointer', marginRight: '10px'}}/>
        <FaTrashAlt  onClick={() => confirm(item.idNotificacao)}  color='#696969'  style={{cursor: 'pointer'}}/>
        </>
      ),
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

    <S.ModalComponent footer={null} title={itemModal?.idNotificacao ? 'Editar Notificação' : 'Nova Notificação'} visible={modal} onCancel={() => setModal(!modal)}>
    <S.ContainerForm>
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
                label="Nome da notificação"
                name="nomeNotificacao"
            >
              <Input  />
            </Form.Item>
              <Form.Item name='descricaoNotificacao' label="Descrição da Notificação">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>

              <Form.Item
                label="Cliente que irá receber a notificação"
                name="clienteId"
                hasFeedback
                initialValue={itemModal?.cliente?.idCliente}
              >
                <Select placeholder="Escolha um cliente para notificar">
                {clientes.length > 0 &&
                  clientes.map((item, index) => (
                    <Option value={item.idCliente}>{item.nomeCliente}</Option>
                  )) }
                </Select>
              </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                {itemModal?.idNotificacao ? 'Editar notificação' : ' Cadastrar nova notificação'}
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}