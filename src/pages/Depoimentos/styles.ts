import styled from 'styled-components'
import { Button } from 'antd';
import { Modal } from 'antd';

export const Container = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    width: 100%;
`
export const ContainerModal = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
`
export const ButtonNovo = styled.div`
    background-color: #fff;
    border-radius: 10px;
    font-weight: 500;
    padding: 10px 15px;
    cursor: pointer;
    transition: 0.8s;
    &:hover{
        padding: 12px 16px;
    }
`
export const Box = styled.div`
    flex-direction: column;
    color: #fff;
    height: 50px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`
export const ContainerTitle = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: space-between;
`
export const ContainerIcons = styled.div`
    width: 50px;
    justify-content: space-between;
    display: flex;

`

export const Title = styled.div`
    color: #fff;
    margin-left: 10px;
`
export const Image = styled.img`
    width: 300px;
`



export const ContainerForm = styled.div`
    width: 490px;
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
    label{
        font-size: 11px;
        font-weight: bold;
    }
`

export const ButtonForm = styled(Button)`
    color: #fff;
    height: 40px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 10px;
`
export const Text = styled.p`
    margin: 0;
    color: #F14902;
    font-size: 30px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
`

export const ModalComponent = styled(Modal)`

`