import styled from "styled-components";
export const Div = styled.div`
  width: 50%;
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
`;
export const Div2 = styled.div`
  margin-right: 70px;
`;
export const Div3 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

export const Div4 = styled.div`
  margin-top: 15px;
`;

export const Table = styled.table`
  color: #fff;
  margin: 3%;
  border-radius: 10px;
  width: 80%;
`;
export const Tr = styled.tr`
  border: 2px solid #fff;
  text-align: left;
`;
export const Th = styled.th`
  border-bottom: 2px solid #fff;
`;
export const Td = styled.td``;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  overflow-x: auto;
  background: #1a1e21;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #000;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const SubContainer1 = styled.div`
  display: flex;
  width: 60%;
  overflow-x: auto;
  background: #1a1e21;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #000;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  margin: 2% 0;
`;

export const ButtonSection = styled.div`
  position: relative;
  left: -25%;
  top: 2%;
  margin-bottom: 2%;
`;
export const ButtonSection1 = styled.div`
  display: flex;
  width: 80%;
  justify-content: left;
  margin-bottom: 2%;
`;

export const Icon = styled.div`
  & {
    color: #ffbf00;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const FormDiv = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin-top: 5%;
`;
export const ConfirmButton = styled.button`
  width: 100px;
  height: 40px;
  color: #fff;
  background: linear-gradient(to right, #ffbf00, #b26c29);
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
  @media screen and (max-width: 800px) {
    width: 100px;
    height: 30px;
    font-size: 12px;
  }
`;
