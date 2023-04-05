import styled from "styled-components";

export const SubSection= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10%;
    width: fit-content;

    @media screen and (max-width: 769px) {
    /* width: 90%; */
    
  }
` 

export const FormSection= styled.form`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 58em;
     padding: 3% 0;
    background-color: #1a1e21;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #000;
    margin: 0 0 5% 0;

  @media screen and (max-width: 769px) {
    flex-direction:column;
    width:100%;
    font-size:80%;
    /*min-height:100vh; */
  }


   
`
export const Div1= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 0 5%;

    @media screen and (max-width: 769px) {
    width: 90%;
    margin:20px;
  }
`

export const Div2= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: left;
    width: 50%;
    margin: 0 5%;

    @media screen and (max-width: 769px) {
    width: 90%;
    
  }

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
export const ItemsCard = styled.div`
    &{
        display: flex;
        margin: 2%;
        width: 100%;
        align-items:center;
        background-color: transparent;
        border: 2px solid #ffffff2d;
        
    }
    
`
export const Details = styled.div`
    display: flex;
    width: 60%;
    flex-direction: column;
    line-height: 0.1rem;
    text-align: left;

    @media screen and (max-width: 769px) {
   padding-left:8px;
   
  }

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
    @media screen and (max-width: 769px) {
    font-size:14px;
  }
`
export const SubText = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 0.15px;
`
export const Text = styled.p`
    color: #ffffff9d;
    font-size: 15px;
    @media screen and (max-width: 769px) {
    font-size:12px;
  }
`
export const CartSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1A1E21;
    @media screen and (max-width: 769px) {
            font-size:80%;

  }
    
`
export const ItemSection = styled.div`
    height: 300px;
    width: 380px;
    background-color: #1A1E21;
    overflow: auto;
    margin: 0 3% 5% 0;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px #000;

    @media screen and (max-width: 769px) {
        width:100%;
        /* height:200px; */
  }


`
export const Text1 = styled.h1`
    color: #FFBF00;
    text-align: center;
`
export const Price = styled.h3`
    color: #fff;
    text-align: center;
`
export const IconSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
     width: 30%;
`
export const Icon = styled.div`
    &{font-size: 24px;
    color:#FFBF00;
    margin: 0 3%;}
    &:hover{
        cursor: pointer;
        transform: scale(1.2);
    }
`