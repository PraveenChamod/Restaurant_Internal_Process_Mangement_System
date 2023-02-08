import styled from "styled-components";
import { RegularButton } from "../../shared/SharedElements/Buttons";

export const FormSection= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 50rem;
    height: 25rem;
    background-color: #1a1e21;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #000;
    margin: 0;
    position: relative;
`
export const Div3 = styled.div`
    margin-top: 15px;
    width: 50%;
    height: 8%;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
`

export const PrintButton = styled(RegularButton)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 5px;
    bottom: 5px;
`
export const Icon = styled.div`
    margin: 5%;
`