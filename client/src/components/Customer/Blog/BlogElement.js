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
    background:url(${Img1}) left top no-repeat;
    background-size: 10rem;
`


export const Div = styled.div`
  width: 65%;
  height: 65%;
  background: rgba(26, 30, 33, 0.6);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;


export const H2 =styled.h2`
  color:white;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Input =styled.input`
  padding: 10px;
  border-radius: 25px;
  background: rgba(26, 30, 33, 0.6);
  border-color: white;
  font-size: 15px;
  color:white;
  
`;

export const Texrarea = styled.textarea`
  border-radius: 25px;
  height: 80px;
  padding:10px;
  background: rgba(26, 30, 33, 0.6);
  border-color: white;
  color:white;
  font-size: 18px;
  resize: none;
`;