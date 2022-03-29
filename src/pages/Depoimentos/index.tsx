import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast } from 'react-toastify';

export type Depoimentos = {
  idDepoimento: number
  nomeClienteDepoimento: string
  imagemCliente: string
  textDepoimento: string
  datecreate: string
  datemodified: string
}

export default function Perguntas() {  
  const [ modal, setModal] = useState(false)
  const { TextArea } = Input;
  const [ data, setData ] = useState<Depoimentos[]>([] as Depoimentos[])
  const [form] = Form.useForm();
  const [ itemModal, setItemModal] = useState<Depoimentos>({} as Depoimentos)

  useEffect(() => {
    async function getDepoimento() {
    await api.get(`Depoimentos`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Depoimentos')
      });
    }
    getDepoimento();
  }, []);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Depoimentos)
    }
  }, [modal])


  function handleDelete(id: any) {
    api.delete(`depoimentos/${id}` ).then(function(response) {
      toast.success('Depoimento excluido')
      setData(data.filter(item => item.idDepoimento !== id))
    }).catch(function(response) {
      toast.error('Depoimento não foi excluido')
    })
  }

    function confirm(id: any) {
      Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir o Depoimento?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
      })
    }

  const onFinish = (values: any) => {
    if(itemModal?.textDepoimento){
      onEdit(values)
      return
    }
    api.post('Depoimentos', values ).then(function(response) {
      setModal(false)
  }).catch(function(response) {
    toast.error('Depoimento não foi salvo com sucesso')
    })
  };

  const onEdit = (values: Depoimentos) => {
    let valor = {
      idDepoimento: itemModal.idDepoimento,
    }
    const dataRequest = Object.assign(values, valor)
    api.put('depoimentos', dataRequest ).then(function(response) {
        setModal(false)
    }).catch(function(response) {
      toast.error('Depoimento não foi salvo com sucesso')
      })  
  };

  const setModalAndItem = (item:Depoimentos) => {
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }
  return (
  <>
    <Home selected={['4']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
          Depoimentos
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
        {data.length > 0 &&
          data.map((item, index) => (
            <S.Box color='rgb(48, 211, 211)' key={index}>
              <S.ContainerTitle>
                <S.Title style={{fontWeight: '500'}}>{item.textDepoimento}</S.Title>
                <S.ContainerIcons>
                  <FaPen onClick={() => setModalAndItem(item)} color='#F14902'/>
                  <FaTrashAlt  onClick={() => confirm(item.idDepoimento)}  color='#696969'/>
                </S.ContainerIcons>
              </S.ContainerTitle>
            </S.Box> 
          ))
        }

      </S.Container> 
    </Home>
    <S.ModalComponent footer={null} title={itemModal?.textDepoimento ? 'Editar Depoimento' : 'Novo Depoimento'} visible={modal} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Nome do Cliente"
              name="nomeClienteDepoimento"
            >
              <Input  />
            </Form.Item>
            <Form.Item
              label="Imagem do cliente"
              name="Imagem cliente"
            >
              <Upload >
                <S.ButtonForm style={{color: 'black'}} type="default" className="login-form-button">Enviar Imagem</S.ButtonForm>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Texto depoimento"
              name="textDepoimento"
            >
              <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                {itemModal?.textDepoimento ? 'Editar depoimento' : 'Cadastrar novo depoimento'}
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}
