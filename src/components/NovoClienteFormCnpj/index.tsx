import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Select, Upload } from 'antd';
import * as S from './styles'
import { MaskedInput } from 'antd-mask-input';
import { Cidades, Estados } from '../NovoClienteForm';
import api from '../../service/api';
import { toast } from 'react-toastify';





export default function FormCnpj({onFinish, form, itemModal}: any) {
  const { Option } = Select;
  const [ estados, setEstados] = useState<Estados[]>([] as Estados[])
  const [ cidades, setCidades] = useState<Cidades[]>([] as Cidades[])
  const [ idEstado, setIdEstado] = useState()
  
  useEffect(() => {
    async function getClientes() {
    await api.get(`util/estados`)
      .then(response => {
        setEstados(response.data)
      }).catch(function (error) {
        toast.error('Erro ao buscar Estados')
      });
    }
    getClientes();
  }, []);

  useEffect(() => {
    async function getClientes() {
    await api.get(`util/cidades/${idEstado}`)
      .then(response => {
        setCidades(response.data)
      }).catch(function (error) {
      });
    }
    getClientes();
  }, [idEstado]);

  
  return(
        <S.ContainerForm>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <S.WrapperForm>
                <Form.Item className='space' style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item
                    label="Nome do Cliente"
                    name="nomeCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                  >
                    <Input  />
                  </Form.Item>

                  <Form.Item
                    label="CNPJ do Cliente"
                    name="cnpjCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)', marginLeft: 'auto'}}
                  >
                    <MaskedInput
                      mask={
                        '000.000.000/0000-00'
                      }
                    />
                  </Form.Item>
                </Form.Item >
                <Form.Item
                  label="E-mail do Cliente"
                  name="emailCliente"
                >
                  <Input  />
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item
                    label="Inscri????o Estadual"
                    name="inscricaoEstadualCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                  >
                    <Input autoComplete="off" placeholder='Insira a Inscri????o Estadual'/>
                  </Form.Item>

                  <Form.Item
                    label="Data de abertura"
                    name="dataAberturaEmpresaCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)', marginLeft: 'auto'}}
                  >
                    <DatePicker autoComplete="off"/>
                  </Form.Item>
                </Form.Item >
                <Form.Item
                  label="Telefone"
                  name="telefoneCliente"
                >
                  <MaskedInput
                      mask={
                        '(00) 0 0000-0000'
                      }
                    />
                </Form.Item>                   
              </S.WrapperForm>



              <S.WrapperForm>
                
                <Form.Item
                  label="Rua"
                  name="ruaEnderecoCliente"
                >
                  <Input  />
                </Form.Item>

                <Form.Item className='space' style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item
                    label="N??mero"
                    name="numEnderecoCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                  >
                    <Input  />
                  </Form.Item>

                  <Form.Item
                    label="cep"
                    name="cepEnderecoCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)', marginLeft: 'auto'}}
                  >
                    <MaskedInput
                      mask={
                        '00000-000'
                      }
                    />
                  </Form.Item>
                </Form.Item >

                <Form.Item style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item
                    label="Bairro"
                    name="bairroEnderecoCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                  >
                    <Input  placeholder='Nome do Bairro'/>
                  </Form.Item>

                  <Form.Item
                    label="Complemento"
                    name="complementoEnderecoCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)', marginLeft: 'auto'}}
                  >
                    <Input  placeholder='Complemento'/>
                  </Form.Item>
                </Form.Item >

                <Form.Item style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item
                    name="estatoClienteId"
                    label="Estado"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                    hasFeedback
                  >
                    <Select 
                    onChange={e => setIdEstado(e)} 
                    placeholder="Escolha uma op????o"
                    showSearch
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    >
                    {estados.length > 0 &&
                      estados.map((item, index) => (
                        <Option value={item.id}>{item.nome}</Option>
                      )) }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="cidadeClienteId"
                    label="Cidade"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                    hasFeedback
                  >
                    <Select 
                      placeholder="Escolha uma op????o"
                      showSearch
                      optionFilterProp="children"
                      >
                    {cidades.length > 0 &&
                      cidades.map((item, index) => (
                        <Option value={item.id}>{item.nome}</Option>
                      )) }
                    </Select>
                  </Form.Item>
                </Form.Item >
              </S.WrapperForm>


              <S.WrapperForm>
              <Form.Item
                name="docCarteiraMotorista"
                label="Carteira de motorista"
                style={{ display: 'inline-block', width: 'calc(48%)' }}
                >
                <Upload >
                  <S.ButtonForm style={{color: 'black'}} type="default" className="login-form-button">Enviar Imagem</S.ButtonForm>
                </Upload>
              </Form.Item>
              <Form.Item
                name="docComprovanteResidencia"
                label="Comprovante de resid??ncia"
                style={{ display: 'inline-block', width: 'calc(48%)' }}
                >
                <Upload >
                  <S.ButtonForm style={{color: 'black'}} type="default" className="login-form-button">Enviar Imagem</S.ButtonForm>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Password"
                name="senhaCliente"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="aprovacaoId"
                label="Status"
                style={{ display: 'inline-block', width: 'calc(48%)' }}
                hasFeedback
              >
                <Select 
                  placeholder="Escolha uma op????o"
                  showSearch
                  optionFilterProp="children"
                >
                  <Option value={1}>Aprovado</Option>
                  <Option value={2}>Reprovado</Option>
                  <Option value={3}>Em An??lise</Option>
                  <Option value={4}>Desativado</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                {itemModal?.idCliente ? 'Editar Cliente' : 'Novo Cliente'}
                </S.ButtonForm>
              </Form.Item>
              </S.WrapperForm>

            </Form>
          </S.ContainerForm>
    )
    
}