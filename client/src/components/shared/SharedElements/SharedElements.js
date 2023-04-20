import styled from "styled-components";
import Chef from '../../../Images/Chef.png';
export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    background:url(${Chef}) left bottom no-repeat;
    background-size: 21.5rem;
    margin-bottom: 5%;
    @media screen and (max-width: 800px){
      background: none;
      padding: 5% 0;
    }
`
export const Header = styled.h1`
    justify-content: center;
    text-transform:uppercase;
  align-items: center;
  text-align: center;
  margin-top: 2%;
  background: linear-gradient(
    60deg,
    rgb(178, 108, 41) 0%,
    rgb(253, 190, 16) 100%
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 1rem;
  margin-bottom: 15px;

   @media screen and (max-width: 769px) {
    font-size:1.5rem;
    letter-spacing:0.7rem;
  }

`