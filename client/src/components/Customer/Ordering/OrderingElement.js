import styled from "styled-components";

export const Page = styled.div`
    display: flex;
    justify-content: center;
    height: fit-content;
    align-items: center;
    margin-bottom:3%;
    flex-direction: column;
`
export const Section = styled.div`
  margin-top: 7%;
  display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    flex-direction: column;
`

export const Div = styled.div`
  /* background: red; */
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 40px;
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  height: 200px;
  width: 200px;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  margin: 2%;
  padding-bottom:10px;
`;


export const Div2 = styled.div`
  height: 70%;
  width: 100%;
  /* background: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Div3 = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Div4 = styled.div`
  height: 40%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Div5 = styled.div`
  height: 40%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Button1 = styled.button`
    position: relative;
    background: white;
    border-radius: 25px;
    border: none;
    font-size: 16px;
    color: #fff;
    font-style: none;
    cursor: pointer;
    width: 80px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 500;
    margin-right: 25px;
    margin-left: 25px;
`;

export const Button2 = styled.button`
    position: relative;
    background: #E6B522;
    border-radius: 50px;
    border: none;
    font-size: 18px;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Img = styled.img`
  height: 37px;
  width: 65px;
`;

export const Img1 = styled.img`
  height: 80px;
  /* width: 100px; */
  /* margin-bottom:-10px; */
  margin-top:20px;
`;

export const P = styled.p`
  font-weight: 700;
  color: white;
`;

export const P1 = styled.p`
  font-size : 14px;
  font-weight: 700;
  color: white;
  margin-top : 2px;
  margin-bottom:2px;
`;

export const RegularButton = styled.button`
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
    text-decoration: none;
    font-weight: 500;
    text-transform: uppercase;
    margin-left:50px;
    margin-right:50px;
`;
export const ButtonSection = styled.div`
  width: 80%;
  display: flex;
  justify-content: left;
  
`