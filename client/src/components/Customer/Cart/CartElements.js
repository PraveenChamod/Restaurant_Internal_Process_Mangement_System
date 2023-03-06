import styled from "styled-components"
export const Container = styled.div`
    padding: 5%;
`
export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    width: 100%;
    margin-top: 5%;

`
export const SubSection1 = styled.div`
    display: flex;
    justify-content: left;
`
export const ProfileImage = styled.div`
    width: 50px;
    height: 50px;
    border-radius:50%;
    margin-right:2%;
`
export const Image = styled.img`
     width: 50px;
    height: 50px;
    border-radius:50%;
`
export const Name = styled.div`
    font-size: 24px;
    color: #fff;
`   
export const SubSection2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SubSection3 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin: 3%;
`
export const ItemsCard = styled.button`
    &{
        display: flex;
        margin: 3%;
        width: 100%;
        align-items:center;
        background-color: #1A1E21;
        box-shadow: 3px 3px 3px #000;
        border-radius: 20px;
        padding: 0 3%;
        border: none;
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
    font-size: 24px;
    font-weight: 300;
`
export const SubText = styled.div`
    display: flex;
    flex-direction: column;
`
export const Text = styled.p`
    color: #ffffff9d;
    font-size: 18px;
`
export const Right = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    margin: 3%;
`
export const Description = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    border-radius: 20px;
    background-color: #1A1E21;
    box-shadow: 3px 3px 3px #000;
    height: 40vh;
    align-items: center;
    justify-content: center;
`
export const ItemTexts = styled.table`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 18px;
    color: #fff;
    flex-direction: column;
    margin-bottom: 3%;
` 
export const Label = styled.div`
    width: 50%;
    float: left;
    text-align: left;
    margin: 2% 0;
`
export const Data = styled.div`
    width: 50%;
    float: right;
    text-align: right;
    margin: 2% 0;
`
export const ButtonSection = styled.div`

`
export const CartSection = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SelectIcon = styled.div`
    &{
        color: #fff;
        font-size: 32px;
    }
    &:hover{
        cursor: pointer;
    }
`
export const Plus = styled.div`
    font-size: 32px;
    color:#FFBF00;
    width: 20%;
`