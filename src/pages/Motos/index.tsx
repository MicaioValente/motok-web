import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import { Modal, Form, Input, Table, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import api from '../../service/api';
import { Cliente } from '../Clientes/types';
import { toast } from 'react-toastify';

export type Motos = {
    idVeiculo: number,
    marcaModelo: string
    placa: string
    renavam: string
    chassi: number,
    anoFabricacao: number,
    anoModelo: number,
    datecreate: string
    datemodified: string
    cliente: Cliente
}

export default function Notificacoes() {  
  const [ modal, setModal] = useState(false)
  const [ trigger, setTrigger] = useState(false)
  const [ data, setData ] = useState<Motos[]>([] as Motos[])
  const [ clientes, setClientes ] = useState<Cliente[]>([] as Cliente[])
  const [form] = Form.useForm();
  const [ itemModal, setItemModal] = useState<Motos>({} as Motos)
  const { Option } = Select;
  
  useEffect(() => {
    async function getVeiculo() {
    await api.get(`veiculo`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Motos')
      });
      await api.get(`clientes`)
      .then(response => {
        setClientes(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Clientes')
      });
    }
    getVeiculo();
  }, [trigger]);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Motos)
    }
  }, [modal])

  function handleDelete(id: any) {
    api.delete(`veiculo/${id}` ).then(function(response) {
      toast.success('Moto excluida')
      setData(data.filter(item => item.idVeiculo !== id))
    }).catch(function(response) {
      toast.error('Moto não foi excluida')
    })
  }
  
  const onFinish = (values: any) => {
    if(itemModal?.idVeiculo){
    onEdit(values)
      return
    }
    api.post('veiculo', values ).then(function(response) {
      setModal(false)
      setTrigger(!trigger)
    }).catch(function(response) {
      toast.error('Moto não foi salva com sucesso')
      })
  };
  
  const onEdit = (values: Motos) => {
    api.put(`veiculo/${itemModal.idVeiculo}`, values ).then(function(response) {
    setTrigger(!trigger)
    setModal(false)
    }).catch(function(response) {
      toast.error('Moto não foi salva com sucesso')
      })  
  };

  function confirm(id: any) {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Moto?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
    });
  }

  const setModalAndItem = (item:Motos) => {
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }

  const columns = [
    {
      title: 'Marca/Modelo',
      dataIndex: 'marcaModelo',
      key: 'marcaModelo',
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
      render: (text: Cliente) => <a>{text.nomeCliente}</a>,
    },
    {
      title: 'Data cadastro',
      dataIndex: 'datecreate',
    },
    {
      title: 'Ação',
      render: (_: string, item: Motos) => (<>
        <FaPen onClick={() => setModalAndItem(item)} color='#F14902' style={{cursor: 'pointer', marginRight: '10px'}}/>
        <FaTrashAlt  onClick={() => confirm(item.idVeiculo)}  color='#696969'/>
        </>
      ),
    },
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['7']} container={['aplicativos']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Motos
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

    <S.ModalComponent footer={null} title={itemModal?.idVeiculo ? 'Editar Moto' : 'Nova Moto'} visible={modal} onCancel={() => setModal(!modal)}>
    <S.ContainerForm>
        <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
                label="Marca/Modelo"
                name="marcaModelo"
            >
              <Input  />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Placa"
                name="placa"
                style={{ display: 'inline-block', width: 'calc(32%)' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Renavam"
                name="renavam"
                style={{ display: 'inline-block', width: 'calc(32%)', margin: '0 8px' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Chassi"
                name="chassi"
                style={{ display: 'inline-block', width: 'calc(32%)',  }}
              >
                <Input />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Ano Fabricação"
                name="anoFabricacao"
                style={{ display: 'inline-block', width: 'calc(48%)' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Ano Modelo"
                name="anoModelo"
                style={{ display: 'inline-block', width: 'calc(48%)', margin: '0 8px' }}
              >
                <Input  />
              </Form.Item>
            </Form.Item>


              <Form.Item
                label="Escolha uma opção caso haja um cliente"
                name="clienteId"
                initialValue={itemModal?.cliente?.idCliente}
                hasFeedback
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
                
                {itemModal?.idVeiculo ? 'Editar Moto' : 'Cadastrar Moto'}
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}