import styled from "styled-components";

export const SubSection= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5%;
`

export const FormSection= styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 55em;
     height: fit-content;
     padding: 3% 0;
    background-color: #1a1e21;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #000;
    margin: 0 0 5% 0;
`
export const Div1= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 0 5%;
`

export const Div2= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: left;
    width: 50%;
    margin: 0 5%;
`
export const Div3= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1px;
    margin: 5% 0;
`

export const h1 =styled.div`
    text-align: center;
    color: yellow;
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
    font-size: 20px;
    font-weight: 300;
`
export const SubText = styled.div`
    display: flex;
    flex-direction: column;
`
export const Text = styled.p`
    color: #ffffff9d;
    font-size: 16px;
`
export const CartSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1A1E21;
`
export const ItemSection = styled.div`
    height: 300px;
    width: 350px;
    background-color: #1A1E21;
    overflow: auto;
    margin-bottom: 5%;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px #000;
`
export const Text1 = styled.h1`
    color: #FFBF00;
    text-align: center;
`
export const Price = styled.h3`
    color: #fff;
    text-align: center;
`