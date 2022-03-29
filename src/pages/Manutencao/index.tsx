import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import { Modal, Form, Input, Table, Select, DatePicker } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import api from '../../service/api';
import { Cliente } from '../Clientes/types';
import { toast } from 'react-toastify';
import { Motos } from '../Motos';

export type Manutencao = {
  idManutencao: number,
  nomeManutencao: string,
  descricaoManutencao: string,
  dataEntrada: string,
  dataEntrega: string,
  cliente: Cliente
}

export default function Manutencao() {  
  const [ modal, setModal] = useState(false)
  const { TextArea, Search  } = Input;
  const [ data, setData ] = useState<Manutencao[]>([] as Manutencao[])
  const [form] = Form.useForm();
  const [ itemModal, setItemModal] = useState<Manutencao>({} as Manutencao)
  const { RangePicker } = DatePicker;
  const [ motos, setMotos ] = useState<Motos[]>([] as Motos[])
  
  useEffect(() => {
    async function getVeiculo() {
      
    }
    getVeiculo();
  }, []);

  useEffect(() => {
    async function getManutencoes() {
    await api.get(`manutencoes`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Manutenções')
      });
      await api.get(`veiculo`)
      .then(response => {
        setMotos(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Clientes')
      });
    }
    getManutencoes();
  }, []);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Manutencao)
    }
  }, [modal])


  function handleDelete(id: any) {
    api.delete(`manutencoes/${id}` ).then(function(response) {
      toast.success('Manutenção excluida')
      setData(data.filter(item => item.idManutencao !== id))
    }).catch(function(response) {
      toast.error('Manutenção não foi excluida')
    })
  }

  const { Option } = Select;

  const onFinish = (values: any) => {

    let teste = {
      marcaModelo: "aaa",
      placa: "aa",
      renavam: "aaa",
      chassi: 2020,
      anoFabricacao: 2001,
      anoModelo: 2011,
    }

    if(itemModal?.idManutencao){
      onEdit(values)
      return
    }
    api.post('manutencoes', teste ).then(function(response) {
      setModal(false)
    }).catch(function(response) {
      toast.error('Manutenção não foi salva com sucesso')
      })
  };
  
  const onEdit = (values: Manutencao) => {
    api.put(`manutencoes/${itemModal.idManutencao}`, values ).then(function(response) {
        setModal(false)
    }).catch(function(response) {
      toast.error('Manutenção não foi salva com sucesso')
      })  
  };

  function callback(key: any) {
  }


  function confirm(id: any) {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Manutenção?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
    });
  }

  const setModalAndItem = (item:Manutencao) => {
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
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Data cadastro',
      dataIndex: 'datecreate',
    },
    {
      title: 'Ação',
      render: (_: string, item: Manutencao) => (<>
        <FaPen onClick={() => setModalAndItem(item)} color='#F14902' style={{cursor: 'pointer', marginRight: '10px'}}/>
        <FaTrashAlt  onClick={() => confirm(item.idManutencao)} style={{cursor: 'pointer'}} color='#696969'/>
        </>
      ),
    },
  ];

  const onSearch = (value: any) => console.log(value);

  return (
  <>
    <Home selected={['8']} container={['aplicativos']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
        Manutenções
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

    <S.ModalComponent footer={null} title={itemModal?.idManutencao ? 'Editar Manutenção' : 'Nova Manutenção'} visible={modal} onCancel={() => setModal(!modal)}>
    <S.ContainerForm>
        <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
                label="Nome da manutenção"
                name="nomeManutencao"
            >
              <Input  />
            </Form.Item>

            <Form.Item  
                label="Descrição da manutenção"
                name={'descricaoManutencao'}>
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>

              <Form.Item name="range-picker" label="RangePicker" >
                <RangePicker />
              </Form.Item>


              <Form.Item
                label="Escolha um moto"
                name="clienteId"
                hasFeedback
              >
                <Select placeholder="Escolha uma Moto">
                {motos.length > 0 &&
                  motos.map((item, index) => (
                  <Option value={item.idVeiculo}>{item.marcaModelo + ' - ' + item.placa}</Option>
                )) }
                </Select>
              </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                {itemModal?.idManutencao ? 'Editar Manutenção' : 'Cadastrar Manutenção'}
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}