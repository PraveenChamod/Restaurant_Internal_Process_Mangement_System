import styled from "styled-components";
export const Div = styled.div`
  width: 50%;
  height: 50%;
  background-color: #1a1e21;  
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-shadow: 3px 3px 3px #000;
  padding: 2% 0;
  /* margin-top: 10%; */
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  margin-top: 15px;
  width: 45%;
  height: 90%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
  justify-content: left;
  align-items: left;
`;

export const Div2 = styled.div`
  margin-top: 15px;
  width: 45%;
  height: 90%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 20px;
  justify-content: center;
  align-items: left;
`;

export const Div3 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
`;



