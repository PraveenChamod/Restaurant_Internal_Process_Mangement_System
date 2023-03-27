import styled from "styled-components";
export const Div = styled.div`
  width: 40%;
  height: 50%;
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
export const Div1 = styled.form`
  width: 50%;
  height: 90%;
  display: flex;
  justify-content: center;
  background-color: #1a1e21;
  align-items: center;
  flex-direction: column;
`;
export const Div2 = styled.div`
  margin-top: 15px;
  width: 40%;
  height: 8%;
  display: flex;
  flex-direction: column;
`;