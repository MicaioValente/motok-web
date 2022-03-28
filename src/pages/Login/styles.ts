import styled from 'styled-components'
import { Button } from 'antd';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(110deg, rgba(91,92,92,1) 0%, rgba(0,0,0,1) 100%);
    align-items: center;
    justify-content: center;
    display: flex;
`



export const ContainerForm = styled.div`
    width: 400px;
    align-items: center;
    .ant-input{
        height: 35px;
    }
    .ant-row .ant-form-item{
        margin-bottom: 2px;
    }
    .ant-btn .ant-btn-primary .sc-dkzDqf .fSeLvW .login-form-button{
        background-color: #F14902;

    }
`

export const ButtonForm = styled(Button)`
    width: 100%;
    background-color: #fff;
    border: 1px solid black;
    color: #000;
    height: 40px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.8s;
    &:hover{
        background-color: #F14902;
        color: #fff;
        border: 1px solid black;
    }
`
export const Image = styled.img`
    height: 100px;
    width: 350px;
`
export const Text = styled.p`
    margin: 0;
    color: #F14902;
    font-size: 30px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
`
