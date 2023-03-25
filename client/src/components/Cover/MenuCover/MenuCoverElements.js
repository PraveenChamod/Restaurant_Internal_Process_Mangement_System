import styled from "styled-components";
export const Container = styled.div`
    &{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100vh;
        top: 0%;
        margin-top: 0;
        z-index: 5000;
        position: relative;
        ${'' /* clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%); */}
    }
    &::before{
        position: absolute;
        height: 100%;
        z-index:2;
        content: '';
        top: 0%;
        right: 0%;
        bottom: 0%;
        left: 0%;
        background: #000000ed;
        ${'' /* background:linear-gradient(#339BFF,#4242425d); */}
        opacity: 0.5;
    }
`
export const CoverContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 35%;
    width: 80%;
    left: 2%;
    margin: 0 10%;
    z-index: 6000;
`
export const Heading = styled.div`
    font-size: 81px;
    color: #FFBF00;
    font-weight: 700;
    letter-spacing: 0.3rem;
`
export const SubHeading = styled.div`
    font-size: 72px;
    color: #FFF;
    font-weight: 600;
    letter-spacing: 0.3rem;
    margin-bottom: 5%;
`
export const ButtonSection = styled.div`

`
export const Button = styled.div`
    width: 150px;
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
        @media screen and (max-width: 800px){
            width: 100px;
        height: 30px;
        font-size: 12px;
        }
`
export const H1 = styled.div`
    @media screen and (max-width: 800px){
         font-size: 3rem;
    }
`
export const H2 = styled.div`
    @media screen and (max-width: 800px){
         font-size: 3rem;
    }
`
export const Image = styled.img`
    width: 100%;
    height: 100vh;
`
export const CoverImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;      
`