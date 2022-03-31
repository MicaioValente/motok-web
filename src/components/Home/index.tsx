import React from 'react';
import { Layout, Menu } from 'antd';
import Logo from '../../assets/logo2.svg'
import * as S from './styles'
import { 
  FileImageOutlined, 
  UserOutlined, 
  IdcardOutlined,
  VideoCameraOutlined,
  QuestionOutlined,
  UsergroupAddOutlined,
  BellOutlined,
  BarcodeOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GiMightySpanner } from 'react-icons/gi'
import { FaMotorcycle } from 'react-icons/fa'
import { AiOutlineAppstore } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'

export default function Home({children, selected, container}: any) {  
  return (
    <S.LayoutStyled>
      <S.SidersTyled
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
        }}
        onCollapse={(collapsed, type) => {
        }}
      >
        <Link to="/">
          <S.Image src={Logo}/>
        </Link>
        <S.Title
          mode="inline"
          defaultSelectedKeys={selected ? selected : ['1']}
          defaultOpenKeys={container ? container : ['sites']}
          style={{borderRight: 0, width: 150}}
        >
          <S.SubMenuStyled key="sites" icon={<RiAdminLine />} title="Sites">
            <S.Description key="1" icon={ <FileImageOutlined />}><Link to="/images" />Imagens</S.Description>
            <S.Description key="2" icon={<IdcardOutlined />}><Link to="/planos" />Planos</S.Description>
            <S.Description key="3" icon={<QuestionOutlined />}><Link to="/perguntas" />Perguntas</S.Description>
            <S.Description key="4" icon={<CommentOutlined />}><Link to="/depoimentos" />Depoimentos</S.Description>
          </S.SubMenuStyled> 
          <S.SubMenuStyled key="aplicativos" icon={<AiOutlineAppstore />} title="Aplicativos">
            <S.Description key="5" icon={<UsergroupAddOutlined />}><Link to="/clientes" />Clientes</S.Description>
            <S.Description key="6" icon={<BellOutlined />}><Link to="/notificacoes" />Notificações</S.Description>
            <S.Description key="7" icon={<FaMotorcycle />}><Link to="/motos" />Motos</S.Description>
            <S.Description key="8" icon={<GiMightySpanner />}><Link to="/manutencao" />Manutenção</S.Description>
            <S.Description key="9" icon={<BarcodeOutlined />}><Link to="/pagamentos" />Pagamentos</S.Description>
          </S.SubMenuStyled>
        </S.Title>
          
      </S.SidersTyled>
      <S.LayoutStyled>
        <S.HeaderStyled className="site-layout-sub-header-background"/>
        <S.ContentStyled style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </S.ContentStyled>
        <S.FooterStyled >MOTOK</S.FooterStyled>
      </S.LayoutStyled>
  </S.LayoutStyled>
  )}
