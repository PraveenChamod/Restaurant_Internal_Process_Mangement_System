import styled from "styled-components";
import Img from '../../../Images/Bolgbg.png';
import Img1 from '../../../Images/restoLogodark.png';

export const Page = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    background:url(${Img}) bottom no-repeat;
`

export const Page1 = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
    align-items: center;
    flex-direction: column;
    background-size: 10rem;
`

export const Div = styled.form`
  display: flex;
  flex-direction: row;
  width: 65%;
  height: 65%;
  background: #1A1E21;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #000;
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  width:50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Div2 = styled.div`
  width:100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;

`;

export const Div3 = styled.div`
  width:100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

export const Div4 = styled.div`
  width:50%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const H2 =styled.h2`
  color:white;
  font-size : 20px;
`;

export const Input =styled.input`
  padding: 5px;
  border-radius: 25px;
  margin: 5px;
  margin-bottom: 10px;
  background: rgba(26, 30, 33, 0.6);
  border-color: white;
  font-size: 15px;
  color:white;
`;

export const RemoveButton = styled.div`
    width: 150px;
        height: 40px;
        border: 2px solid #B26C29;
        cursor: pointer;
        position: relative;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-weight: 500;
        text-transform: uppercase;

`
export const Label = styled.label`
  height: 40px;
        color:#fff;
        background: linear-gradient(to right, #FFBF00, #B26C29);
        border: none;
        cursor: pointer;
        position: relative;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        width: 65%;
        text-transform: uppercase;
`