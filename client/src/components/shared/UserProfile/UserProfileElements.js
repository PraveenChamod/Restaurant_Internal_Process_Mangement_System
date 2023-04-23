import styled from "styled-components";
import Img1 from "../../../Images/restoLogodark.png"

export const UserProfileContainer = styled.div`
display: flex;
justify-content: center;
height: 100vh;
align-items: center;
flex-direction: column;
background-size: 10rem;

`
export const Div = styled.div`
  width: 50%;
  height: 60%;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
    padding: 3% 0;
  }
`
export const Img = styled.img`
    width: 200px;
    height: 200px;
    margin-top:10px;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    @media screen and (max-width:200px){
      border-bottom-right-radius: 50%;
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      border-top-right-radius: 50%;
    }
`
export const Header = styled.h1`
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgb(178, 108, 41) 0%,
    rgb(253, 190, 16) 100%
  );
  font-size: 40px;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 1rem;
  margin-bottom: 5px;
`
export const P = styled.p`
  color: #fff;
  font-size: 20px;
  margin-top :-10px;
  @media screen and (max-width:769px){
    font-size: 100%;
    margin: 3% 0;
  } 
`