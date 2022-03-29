import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input, Upload } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast } from 'react-toastify';

export type Imagem = {
  id: number
  nome: string
  arquivo: string
  arquivoBase64: string
}

export type Data = {
  nome: string,
  arquivo: string,
  arquivoBase64: string | null | ArrayBuffer
}

export default function ImagesHome() {  
  const [ modal, setModal] = useState(false)
  const [ data, setData ] = useState<Imagem[]>([] as Imagem[])
  const [form] = Form.useForm();
  const [ itemModal, setItemModal] = useState<Imagem>({} as Imagem)

  useEffect(() => {
    async function getImage() {
    await api.get(`Slide`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Imagems')
      });
    }
    getImage();
  }, []);
  
  const onFinish = (values: any) => {
    let dataRequest = {
      nome: values.nome,
      arquivo: values.image.file.name,
      arquivoBase64: "string"
    } as  Data
    let file = values.image.file.originFileObj
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(reader){
        if(reader?.result){
          let nada = reader.result.toString()
          nada.replace("data:image/png;base64,", '')
        dataRequest.arquivoBase64 = nada
      }}
    };
    reader.onerror = function (error) {
    };

    if(itemModal?.id){
      onEdit(dataRequest)
      return
    }
    api.post('slide', dataRequest ).then(function(response) {
      setModal(false)
    }).catch(function(response) {
      toast.error('Imagem não foi salva com sucesso')
      })
    };

  const onEdit = (values: Data) => {
    api.put(`slide/${itemModal.id}`, values ).then(function(response) {
        setModal(false)
    }).catch(function(response) {
      toast.error('Depoimento não foi salvo com sucesso')
      })  
  };    

    function handleDelete(id: any) {
      api.delete(`slide/${id}` ).then(function(response) {
        toast.success('Imagem excluido')
        setData(data.filter(item => item.id !== id))
      }).catch(function(response) {
        toast.error('Imagem não foi excluido')
      })
    }

  function confirm(id: any) {
      Modal.confirm({
      title: 'Confirmar',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja Excluir a Imagem?',
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(id)
    });
  }
  const setModalAndItem = (item:Imagem) => {
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }
  return (
  <>
    <Home selected={['1']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Imagens
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
        {data.length > 0 &&
          data.map((item, index) => (
            <S.Box color='rgb(48, 211, 211)'>
              <S.ContainerTitle>
                <S.Title>{item.nome}</S.Title>
                <S.ContainerIcons>
                  <FaPen onClick={() => setModalAndItem(item)} color='#F14902'/>
                  <FaTrashAlt onClick={() => confirm(item.id)} color='#696969'/>
                </S.ContainerIcons>
              </S.ContainerTitle>
              <S.Image src={'data:image/png;base64,'+item.arquivoBase64}/>
            </S.Box> 
          ))
        }
      </S.Container> 
    </Home>
    <Modal footer={null} title="Trocar Imagem" visible={modal} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
        <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="nome"
              rules={[{ required: true, message: 'Insira o Nome!' }]}
            >
              <Input  placeholder="Nome" />
            </Form.Item>
            <Form.Item
              name="image"
              rules={[{ required: true, message: 'Insira a imagem' }]}
            >
               <Upload >
                <S.ButtonForm style={{color: 'black'}} type="default" className="login-form-button">Enviar Imagem</S.ButtonForm>
              </Upload>
            </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                Entrar
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </Modal>
  </>
)}
