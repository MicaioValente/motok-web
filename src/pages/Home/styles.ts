import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`

export const Box = styled.div`
    flex-direction: column;
    background-color: ${({color}) => color};
    color: #fff;
    height: 100px;
    border-radius: 10px;
    padding: 20px 80px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 280px;
    margin-top: 20px;
`
export const ContainerTitle = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    color: #fff;
`
export const Title = styled.div`
    color: #fff;
    margin-left: 10px;
`
export const Unidades = styled.div`
    color: #fff;
    margin-top: auto;
    font-weight: bold;
    font-size: 15px;
    text-decoration: underline;
`