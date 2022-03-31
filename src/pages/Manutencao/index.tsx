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
import moment from 'moment';

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
  const [ motos, setMotos ] = useState<Cliente[]>([] as Cliente[])
  const [ trigger, setTrigger] = useState(false)
  
  useEffect(() => {
    async function getManutencoes() {
    await api.get(`manutencoes`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Manutenções')
      });
      await api.get(`clientes`)
      .then(response => {
        setMotos(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Clientes')
      });
    }
    getManutencoes();
  }, [trigger]);

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
    let obj = {
      nomeManutencao: values.nomeManutencao,
      descricaoManutencao: values.descricaoManutencao,
      dataEntrada: values.data[0].format(),
      dataEntrega: values.data[1].format()
    }
    let dataRequest = Object.assign(obj, values)
      delete dataRequest.data
    console.log({dataRequest}, 'opa')
    if(itemModal?.idManutencao){
      onEdit(dataRequest)
      return
    }
    api.post('manutencoes', dataRequest ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
    }).catch(function(response) {
      toast.error('Manutenção não foi salva com sucesso')
      })
  };
  
  const onEdit = (values: Manutencao) => {
    api.put(`manutencoes/${itemModal.idManutencao}`, values ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
    }).catch(function(response) {
      toast.error('Manutenção não foi salva com sucesso')
      })  
  };


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
    let data = {
      data: [moment(item.dataEntrada), moment(item.dataEntrega)]
    }
    let dataRequest = Object.assign(data, item)

    setModal(!modal)
    form.setFieldsValue(dataRequest)
    setItemModal(item)
  }

  const columns = [
    {
      title: 'Nome Manutenção',
      dataIndex: 'nomeManutencao',
      key: 'nomeManutencao',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Descrição Manutenção',
      dataIndex: 'descricaoManutencao',
      key: 'descricaoManutencao',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (text: Cliente) => <a>{text.nomeCliente}</a>,
    },
    {
      title: 'Data Entrada',
      dataIndex: 'dataEntrada',
      key: 'dataEntrada',
      render: (text: string) => <a>{moment(text).format('MM/DD/YYYY - HH:mm')}</a>,
    },
    {
      title: 'Data Entrega',
      dataIndex: 'dataEntrega',
      key: 'dataEntrega',
      render: (text: string) => <a>{moment(text).format('MM/DD/YYYY - HH:mm')}</a>,
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
  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
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
            <Form.Item  
              label="Data da manutenção"
              name={'data'}
              // initialValue={[moment(itemModal?.dataEntrada), moment(itemModal?.dataEntrega)]}
              >
                
              {/* <RangePicker defaultPickerValue={[moment(), moment()]} disabledDate={disabledDate}/> */}
              <RangePicker />
            </Form.Item>
                


              <Form.Item
                label="Escolha um cliente"
                name="clienteId"
                hasFeedback
              >
                <Select placeholder="Escolha um Cliente">
                {motos.length > 0 &&
                  motos.map((item, index) => (
                  <Option value={item.idCliente}>{item.nomeCliente}</Option>
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