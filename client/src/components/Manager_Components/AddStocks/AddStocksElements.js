import styled from "styled-components";
export const Div = styled.form`
  width: 50%;
  height: fit-content;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  padding: 2% 0;
  /* margin-top: 10%; */
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  width: 100%;
`;
export const Div2 = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;

`;
export const Div3 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
`;

export const Div4 = styled.div`
  margin-top: 15px;
`;
