import React, { useEffect, useState } from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { 
  UserOutlined, 
  IdcardOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import api from '../../service/api';

export type Dashboard = {
  qtdPlanos: number,
  qtdClientes: number,
  qtdMotos: number,
  qtdBoletos: number
}

export default function HomePage() {  
  const [ data, setData ] = useState<Dashboard>({} as Dashboard)
  

  useEffect(() => {
    async function getQuestion() {
    await api.get(`Dashboard`)
        .then(response => {
          setData(response.data)
        }).catch(function (error) {
        });
    }

    getQuestion();
}, []);


  return (
    <Home>
      <S.Container>
        {data && 
        <>
          <S.Box color='rgb(48, 211, 211)'>
            <S.ContainerTitle>
              <IdcardOutlined />
              <S.Title> Nº de Planos</S.Title>
            </S.ContainerTitle>
            <S.Unidades>{data.qtdPlanos}</S.Unidades>
          </S.Box>  

          <S.Box color='#d82d96'>
            <S.ContainerTitle>
              <UserOutlined />
              <S.Title> Nº de Clientes</S.Title>
            </S.ContainerTitle>
            <S.Unidades>{data.qtdClientes}</S.Unidades>
          </S.Box> 

          <S.Box color='rgb(216, 52, 52)'>
            <S.ContainerTitle>
              <IdcardOutlined />
              <S.Title> Nº de Motos</S.Title>
            </S.ContainerTitle>
            <S.Unidades>{data.qtdMotos}</S.Unidades>
          </S.Box> 

          <S.Box color='#b6d42e'>
            <S.ContainerTitle>
              <BarcodeOutlined />
              <S.Title> Nº de Boletos</S.Title>
            </S.ContainerTitle>
            <S.Unidades>{data.qtdBoletos}</S.Unidades>
          </S.Box>
          
        </> 
      }
      </S.Container> 
    </Home>
  )}
