import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { FaPen , FaTrashAlt} from 'react-icons/fa'
import { Modal, Form, Input, Upload, InputNumber } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../service/api';
import { toast, ToastContainer } from 'react-toastify';
import { currencyMask } from '../../utils/mask';

export type Planos = {
  appClientesMotoks: string
  datecreate: string
  datemodified: string
  descricaoPlano:  string
  idPlanos: number
  nomePlano: string
  observacaoPlano: string
  pagamento: string
  precoPlano: string
  valorCaucao: string
  valorSemanal: string
}


export default function Planos() {  
  const [ modal, setModal] = useState(false)
  const [ itemModal, setItemModal] = useState<Planos>({} as Planos)
  const { TextArea } = Input;
  const [ data, setData ] = useState<Planos[]>([] as Planos[])
  const [valuesFormated, setValuesFormated] = useState({
    precoPlano: '',
    valorSemanal: '',
    valorCalcao: '',
  })
  const [form] = Form.useForm();
  const [ trigger, setTrigger] = useState(false)

  useEffect(() => {
    async function getPlanos() {
    await api.get(`Planos`)
      .then(response => {
        setData(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar planos')
      });
    }
    getPlanos();
  }, [trigger]);

  useEffect(() => {
    if(!modal){
      form.resetFields()
      setValuesFormated({ precoPlano: '',valorSemanal: '', valorCalcao: ''})
      setItemModal({} as Planos)
    }
  }, [modal])

  function handleDelete(id: any) {
    api.delete(`planos/${id}` ).then(function(response) {
      toast.success('Plano excluido')
      setData(data.filter(item => item.idPlanos !== id))
    }).catch(function(response) {
      toast.error('Plano não foi excluido')
    })
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
  
  const onFinish = async (values: any) => {
    if(itemModal?.idPlanos){
      onEdit(values)
      return
    }
    api.post('planos', values ).then(function(response) {
      setTrigger(!trigger)
      setModal(false)
    }).catch(function(response) {
      toast.error('Plano não foi salvo com sucesso')
      })
    };

  const onEdit = (values: Planos) => {
    let valor = {
      idPlano: itemModal.idPlanos,
    }
    const dataRequest = Object.assign(values, valor)
    api.put('planos', dataRequest ).then(function(response) {
    setTrigger(!trigger)
    setModal(false)
    }).catch(function(response) {
      toast.error('Plano não foi salvo com sucesso')
      })  
  };

  const setModalAndItem = (item:Planos) => {
    setModal(!modal)
    form.setFieldsValue(item)
    setItemModal(item)
  }

  return (
  <>
    <Home selected={['2']}>
      <S.ContainerModal>
        <S.Title style={{fontWeight: 'bold', fontSize: '20px'}}>
            Planos
        </S.Title>
        <S.ButtonNovo onClick={() => setModal(!modal)}>
          Novo +
        </S.ButtonNovo>
      </S.ContainerModal>
      <S.Container>
        {data.length > 1 ? 
        data.map((item, index) => (
          <S.Box color='rgb(48, 211, 211)' key={index}>
            <S.ContainerTitle>
              <S.Title style={{fontWeight: '500'}}>{item.nomePlano + ' - ' + item.precoPlano }</S.Title>
              <S.ContainerIcons>
                <FaPen onClick={() => setModalAndItem(item)} color='#F14902'/>
                <FaTrashAlt  onClick={() => {confirm(item.idPlanos)}}  color='#696969'/>
              </S.ContainerIcons>
            </S.ContainerTitle>
          </S.Box>)) : null
        }
      </S.Container> 
    </Home>
    <S.ModalComponent footer={null} title={itemModal?.idPlanos ? 'Editar plano' : 'Novo plano'} visible={modal} onCancel={() => setModal(!modal)}>
      <S.ContainerForm>
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
                label="Nome do plano"
                name="nomePlano"
            >
              <Input  />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Preço do plano"
                name="precoPlano"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)' }}
              >
                <Input />
              
              </Form.Item>

              <Form.Item
                label="Tipo de pagamento"
                name="pagamento"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)', margin: '0 8px' }}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Valor semanal"
                name="valorSemanal"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)', margin: '0 8px' }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Valor do Calção"
                name="valorCaucao"
                style={{ display: 'inline-block', width: 'calc(23% - 8px)', margin: '0 8px' }}
              >
                <Input />
              </Form.Item>

              <Form.Item  
                name={'descricaoPlano'} 
                label="Descrição do plano">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>

              <Form.Item 
                name={ 'observacaoPlano'}
                label="Observação do plano">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>

            </Form.Item>
            <Form.Item>
              <S.ButtonForm type="primary"  htmlType="submit"  className="login-form-button">
                {itemModal?.idPlanos ? 'Editar plano' : 'Cadastrar novo plano'}
              </S.ButtonForm>
            </Form.Item>
          </Form>
      </S.ContainerForm>
    </S.ModalComponent>
  </>
)}
  // appClientesMotoks: null
  // datecreate: "2022-02-01T09:50:18"
  // datemodified: "2022-03-07T18:06:33"
  // descricaoPlano: "Manutenção preventiva;\r\nSuporte e resgate;\r\nSeguro terceiro;\r\nApp de entregas exclusivo;\r\nIsenção de IPVA e licenciamento;\r\nCobrança semanal"
  // idPlanos: 1
  // nomePlano: "PLANO ANUAL"
  // observacaoPlano: "Cobrança semanal;\r\nValor semanal: R$ 293,30;\r\nValor da caução: R$ 600,00"
  // pagamento: "Semanal"
  // precoPlano: "41,90"
  // valorCaucao: "600,00"
  // valorSemanal: "293,30"