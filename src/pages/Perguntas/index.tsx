import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast } from 'react-toastify';

export type Perguntas = {
  id: number
  pergunta: string
  resposta: string
  datecreate: string
  datemodified: string
}

export default function Perguntas() {  
  const [ data, setData ] = useState<Perguntas[]>([] as Perguntas[])
  const [ itemModal, setItemModal] = useState<Perguntas>({} as Perguntas)
  const [ modal, setModal] = useState(false)
  const [ trigger, setTrigger] = useState(false)
  const [form] = Form.useForm();

  useEffect(() => {
    async function getPerguntas() {
    await api.get(`Perguntas`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Perguntas')
      });
    }
    getPerguntas();
  }, [trigger]);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setItemModal({} as Perguntas)
    }
  }, [modal])


  const onFinish = (values: Perguntas) => {
    values.resposta = ''
    if(itemModal?.id){
      onEdit(values)
      return
    }
    api.post('Perguntas', values ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
    }).catch(function(response) {
      toast.error('Pergunta não foi salva com sucesso')
      })
  };

  
  const onEdit = (values: Perguntas) => {
    let valor = {
      id: itemModal.id,
    }
    const dataRequest = Object.assign(values, valor)
    api.put('Perguntas', dataRequest ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
    }).catch(function(response) {
      toast.error('Pergunta não foi salva com sucesso')
      })  
  };


  function handleDelete(id: any) {
    api.delete(`Perguntas/${id}` ).then(function(response) {
      toast.success('Pergunta excluida')
      setData(data.filter(item => item.id !== id))
    }).catch(function(response) {
      toast.error('Pergunta não foi excluida')
    })
  }

  function confirm(id: any) {
    Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Pergunta?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
    });
  }

  const setModalAndItem = (item:Perguntas) => {
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }

  return (
  <>
    <Home selected={['3']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Perguntas
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Nova +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
      {data.length > 1 ? 
        data.map((item, index) => (
          <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <S.Title style={{fontWeight: '500'}}>{item.pergunta}</S.Title>
            <S.ContainerIcons>
              <FaPen onClick={() => setModalAndItem(item)} color='#F14902'/>
              <FaTrashAlt onClick={() => {confirm(item.id)}}  color='#696969'/>
            </S.ContainerIcons>
          </S.ContainerTitle>
        </S.Box> )) : null
        }
        

      </S.Container> 
    </Home>
    <S.ModalComponent footer={null} title={itemModal?.id ? 'Editar Pergunta' : 'Cadastrar Pergunta'} visible={modal} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
        <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
                label="Pergunta"
                name="pergunta"
            >
              <Input  />
            </Form.Item>
            <Form.Item
                label="Resposta"
                name="resposta"
            >
              <Input  />
            </Form.Item>

            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                {itemModal?.id ? 'Editar Pergunta' : 'Cadastrar Pergunta'}
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}
