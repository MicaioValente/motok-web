import styled from 'styled-components'
import { Button } from 'antd';

export const Container = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-around;
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
    padding: 10px 15px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.8s;
    &:hover{
        padding: 12px 16px;
    }
`
export const Box = styled.div`
    flex-direction: column;
    color: #fff;
    height: 100px;
    width: 300px;
    border-radius: 10px;
    width: fit-content;
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
    color: #fff;
    height: 40px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`
export const Text = styled.p`
    margin: 0;
    color: #F14902;
    font-size: 30px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
`