import React from 'react';
import Home from '../../components/Home';
import * as S from './styles'
import { 
  UserOutlined, 
  IdcardOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';

export default function HomePage({children}: any) {  
  
  return (
    <Home>
      <S.Container>
        <S.Box color='rgb(48, 211, 211)'>
          <S.ContainerTitle>
            <IdcardOutlined />
            <S.Title> Nº de Planos</S.Title>
          </S.ContainerTitle>
          <S.Unidades>4</S.Unidades>
        </S.Box>  

        <S.Box color='#d82d96'>
          <S.ContainerTitle>
            <UserOutlined />
            <S.Title> Nº de Planos</S.Title>
          </S.ContainerTitle>
          <S.Unidades>4</S.Unidades>
        </S.Box> 

        <S.Box color='rgb(216, 52, 52)'>
          <S.ContainerTitle>
            <IdcardOutlined />
            <S.Title> Nº de Planos</S.Title>
          </S.ContainerTitle>
          <S.Unidades>4</S.Unidades>
        </S.Box> 

        <S.Box color='#b6d42e'>
          <S.ContainerTitle>
            <BarcodeOutlined />
            <S.Title> Nº de Planos</S.Title>
          </S.ContainerTitle>
          <S.Unidades>4</S.Unidades>
        </S.Box> 

      </S.Container> 
    </Home>
  )}