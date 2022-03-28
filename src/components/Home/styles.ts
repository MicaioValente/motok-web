import { Layout, Menu } from 'antd';
import styled from 'styled-components'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const Container = styled.div`

`
export const SidersTyled = styled(Sider)`
    display: flex;
    background-color: #1B1B1B;
    height: 100vh;
    justify-content: center;
    flex-direction: row;
    ul{
        background-color: transparent;
    }

    
`
export const Image = styled.img`
    margin-top: 40px;
    width: auto;
    height: 120px;
`

export const Title = styled(Menu)`
    background-color: transparent;
    color: #fff;
    .ant-menu-item-selected {
        background-color: #F14902 !important;
        color: #fff !important;
    }
    .ant-menu-inline .ant-menu-item{
        color: #fff !important;
    }
    &:hover{
        color: #F14902 !important;
        
    }
    .ant-menu-light .ant-menu-submenu-active{
        background-color: #F14902 !important;
        color: #fff !important;
    }
    .ant-menu-submenu-title{
            color: #fff !important;
        }
    
`
export const Description = styled(Menu.Item)`
    background-color: transparent;
    &:hover{
        color: #F14902 !important;
    }
    &::after{
        border-right: #F14902 !important;
    }
    &::before{
        border-right: #F14902 !important;
    }
`
export const SubMenuStyled = styled(SubMenu)`
    background-color: transparent;
    color: #fff;
    &:hover{
        color: #F14902 !important;
        .ant-menu-submenu-title{
            color: #fff !important;
            &:hover{
                color: #F14902 !important;
            }
        }
    }
    .ant-menu-item-selected {
        background-color: #F14902 !important;
        color: #fff !important;
    }
    .ant-menu-inline .ant-menu-item{
        color: #fff !important;
    }
    .ant-menu-submenu-arrow{
        color: #fff !important;
    }
    ul{
        background-color: transparent !important;
        color: #fff;
        &:hover{
            color: #F14902 !important;
        }
    }
`
export const HeaderStyled = styled(Header)`
    padding: 0;
    background-color: #27272A;
`
export const ContentStyled = styled(Content)`
    background-color: #27272A;
    /* background-color: #353133; */
`
export const LayoutStyled = styled(Layout)`
    background-color: #353133;
`
export const FooterStyled = styled(Footer)`
    background-color: #353133;
    color: #fff;
    font-weight: 600;
    text-align: center;
`