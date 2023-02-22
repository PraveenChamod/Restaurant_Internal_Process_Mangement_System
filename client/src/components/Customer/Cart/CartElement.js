import styled from "styled-components";

export const Page = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;


export const Div = styled.div`
  height:10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top:90px;
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  height: 8%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const Div2 = styled.div`
  height: 66%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Div3 = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Div4 = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;

`;

export const Div5 = styled.div`
  height: 30%;
  width: 60%;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-shadow: 3px 3px 3px #000;
  margin-bottom: 20px;
`;

export const Div6 = styled.div`
  height:70%;
  width: 70%;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  box-shadow: 3px 3px 3px #000;
  margin-top:auto;
  margin-bottom: auto;
`;

export const Div7 = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Div8 = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
    height:60px;
    border-radius: 50%;
    margin-left: 30px;
`;

export const Img1 = styled.img`
  height: 100px;
`;


export const H1 = styled.h1`
  font-size:18px;
  font-weight: 600;
  color: white;
  margin-left: 10px;
  margin-top: 20px;
`;

export const H2 = styled.div`
  font-size:18px;
  font-weight: 600;
  color: white;
  float:right;
  text-align:right;
 
`;

export const H3 = styled.div`
  font-size:18px;
  font-weight: 600;
  color: white;
  float:right;
  text-align:right;
  
`;

export const H4 = styled.h1`
  font-size:18px;
  font-weight: 700;
  color: white;
  float:left;
  text-align:left;
  letter-spacing: 0.3rem;
`;

export const H5 = styled.h1`
  font-size:13px;
  font-weight: 600;
  color: gray;
  float:left;
  text-align:left;
  margin-top: 0px;
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