import styled from "styled-components"
import { RegularButton } from "../shared/SharedElements/Buttons"
export const Div3 = styled.div`
    margin-top: 15px;
    width: 50%;
    height: 8%;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
`
export const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    background-color: #1a1e21;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #000;
`
export const FormSection= styled.div`
    width: 90%;
    height: 100%;
    background-color: #1a1e21;
    border-radius: 25px;
    box-shadow: 3px 3px 10px #000;
    margin: 2% 5%;
    position: relative;
`
export const PrintButton = styled(RegularButton)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    right: 5px;
    bottom: 5px;
`
export const Icon = styled.label`
    margin: 5%;
    color: #fff;
    font-size: 28px;
`
export const ButtonSection = styled.div`
    position: relative;
    margin: 0 0 3% 0;
`
export const Div1 = styled.div`
    display: flex;
    width: 50%;
    height: 100vh;
    flex-direction: column;
    position: relative;
    top: 10%;
    margin-bottom: 10%;
`
export const Preview = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    height: 500px;
    width: 100%;

`