import styled from "styled-components";
export const Container = styled.div`
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5% 0;
    @media screen and (max-width: 800px){
        margin: 0;
        height: 100%;
    }
`
export const Section1 = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    @media screen and (max-width: 800px){
        width: 100%;
    }
`
export const Section2 = styled.div`
    width: 80%;
    height: 90%;
    display: block;
    position: relative;
    top: -5%;
    @media screen and (max-width: 800px){
         top: 0%;
         height: 60%;
    }
`
export const SubSec = styled.div`
    width: 250px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #161a1d;
    border-radius: 20px;
    box-shadow: 2px 3px 3px 2px #fdf8ed;
    margin-top: 5%;
    @media screen and (max-width: 800px){
        height: 250px;
    }
`
export const Heading = styled.div`
    color: #B26C29;
    letter-spacing: 0.1em;
    font-size: 2em;
    margin: 0;
    text-align: center;
    @media screen and (max-width: 800px){
        font-size: 1em;
    }
`
export const H2 = styled.h1`
        letter-spacing: 0.2em;
        font-size: 40px;
        font-weight: 500;
        text-align: center;
        color: #fff;
        position: relative;
        top: -10%;
        @media screen and (max-width: 900px){
            text-align: center;
            font-size: 1.2em;
            margin: 15px 0 5px 0;
        }
    `
export const Description = styled.div`
    text-align: center;
    color: #fff;
    line-height: 10px;
`
export const Name = styled.h2`
    letter-spacing: 0.2rem;
`
export const Section3 = styled.div`
    width: 150px;
    height: 40px;
    position:relative;
    top: -15%;
    @media screen and (max-width: 900px){
        width: 100%;
        display: flex;
        margin-bottom: 5%;
        justify-content: center;
    }
`
export const Images = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
`
export const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
`
export const SubHeading = styled.div`
    text-align: center;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.2rem;
    font-size: 1rem;
    @media screen and (max-width: 800px){
        line-height: 120%;
    }
`