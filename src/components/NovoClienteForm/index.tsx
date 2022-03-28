import React from 'react'
import { Form, Input, Select, Upload } from 'antd';
import * as S from './styles'
import { MaskedInput } from 'antd-mask-input';






export function FormPf({onFinish}: any) {
  const { Option } = Select;
  
  return(
        <S.ContainerForm>
            <Form
              name="normal_login"
              className="login-form"
              layout="vertical"
              initialValues={{ remember: true }}
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
                    label="CPF do Cliente"
                    name="cpfCliente"
                    style={{ display: 'inline-block', width: 'calc(48%)', marginLeft: 'auto'}}
                  >
                    <MaskedInput
                      mask={
                        '000.000.000-00'
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
                <Form.Item label="Nascimento" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="diaNascimento"
                    rules={[{  message: 'Insira o Preço!'}]}
                    style={{ display: 'inline-block', width: 'calc(32%)' }}
                  >
                    <Input  placeholder='Dia'/>
                  </Form.Item>

                  <Form.Item
                    name="mesNascimento"
                    style={{ display: 'inline-block', width: 'calc(32%)', margin: '0 8px' }}
                  >
                    <Input  placeholder='Mês'/>
                  </Form.Item>

                  <Form.Item
                    name="anoNascimento"
                    style={{ display: 'inline-block', width: 'calc(32%)',  }}
                  >
                    <Input placeholder='Ano'/>
                  </Form.Item>
                </Form.Item>

                <Form.Item style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item
                    label="Nome da Mãe"
                    name="nomeMae"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                  >
                    <Input  placeholder='Nome da Mãe'/>
                  </Form.Item>

                  <Form.Item
                    label="Nome do Pai"
                    name="nomePai"
                    style={{ display: 'inline-block', width: 'calc(48%)', marginLeft: 'auto'}}
                  >
                    <Input  placeholder='Nome do Pai'/>
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
                    label="Número"
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
                    <Select placeholder="Escolha uma opção">
                      <Option value="china">China</Option>
                      <Option value="usa">U.S.A</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="cidadeClienteId"
                    label="Cidade"
                    style={{ display: 'inline-block', width: 'calc(48%)' }}
                    hasFeedback
                  >
                    <Select placeholder="Escolha uma opção">
                      <Option value="china">China</Option>
                      <Option value="usa">U.S.A</Option>
                    </Select>
                  </Form.Item>
                </Form.Item >
              </S.WrapperForm>


              <S.WrapperForm>
              <Form.Item
                name="docCarteiraMotorista"
                label="Carteira de motorista"
              >
                <Upload >
                  <S.ButtonForm style={{color: 'black'}} type="default" className="login-form-button">Enviar Imagem</S.ButtonForm>
                </Upload>
              </Form.Item>
              <Form.Item
                name="docComprovanteResidencia"
                label="Comprovante de residência"
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
              <Form.Item>
                <S.ButtonForm type="primary" htmlType="submit" className="login-form-button">
                  Cadastrar
                </S.ButtonForm>
              </Form.Item>
              </S.WrapperForm>

            </Form>
          </S.ContainerForm>
    )
    
}