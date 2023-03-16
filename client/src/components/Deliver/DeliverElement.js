import styled from "styled-components";

export const FormSection= styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50rem;
    height: fit-content;
    background-color: #1a1e21;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #000;
    margin: 0 0 5% 0;
`;
export const SubSection= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5%;
    height: 100%;
`
export const Div1= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 3% 5%;
`;
export const Div2= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: left;
    width: 50%;
    margin: 0 5%;
`
export const Icon = styled.div`
  &{
    width: fit-content;
  height: fit-content;
  border-radius: 50px;
  background-color:#FFBF00;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  padding: 5%;
  position: relative;
  top:-25%;
  left: 0%;
  margin-bottom: 3%;
  color: #fff;
  }
  &:hover{
    cursor: pointer;
  }
`
export const IconSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
    font-size: 24px;
`
export const Icon1 = styled.div`
    display: flex;
    color: #FFBF00;
    margin: 0 2%;
`
export const Text = styled.div`
    color: #fff;
    margin: 0 2%;
`
export const ButtonSection = styled.div`
    position: relative;
`

export const ButtonSection1 = styled.div`
    position: relative;
    left:-23%;
    top: -2%;
     
`
export const ItemsCard = styled.button`
    &{
        display: flex;
        margin: 3%;
        width: 100%;
        align-items:center;
        background-color: transparent;
    }
    &:hover{
        cursor: pointer;
    }
`
export const Details = styled.div`
    display: flex;
    width: 60%;
    flex-direction: column;
    line-height: 0.1rem;
    text-align: left;
`
export const FoodImage = styled.div`
    height: 90px;
    width: 30%;
    margin: 3%;
`
export const Food = styled.img`
     width: 90px;
    height: 90px;
`
export const MainText = styled.div`
    color: #fff;
`
export const FoodName = styled.h2`
    font-size: 18px;
    font-weight: 300;
`
export const SubText = styled.div`
    display: flex;
    flex-direction: column;
`
export const CartSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`