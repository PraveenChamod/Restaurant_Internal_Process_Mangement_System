import styled from "styled-components";
export const Div = styled.div`
  width: 50%;
  height: 60%;
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
export const Div1 = styled.form`
  width: 45%;
  height: 100%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: left;
  align-items: left;
`;

export const Div2 = styled.div`
  width: 45%;
  height: 100%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
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
  width: 100%;
  height: 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ImageSection = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  margin: 5%;
  flex-direction: column;
  align-items: flex-end;
`
export const UpdateButton = styled.button`
  position: relative;
  background: linear-gradient(to right, #FFBF00, #B26C29);
  border-radius: 20px;
  border: none;
  font-size: 16px;
  color: #fff;
  font-style: none;
  cursor: pointer;
  width: 300px;
  height: 30px;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 500;
`;

export const ImageSubSec = styled.div`
  width: 160px;
  height: 160px;
  margin: 5%;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Icon = styled.label`
  &{
    width: fit-content;
  height: fit-content;
  border-radius: 50px;
  background-color:#FFBF00;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 5%;
  position: relative;
  top:-25%;
  left: -15%;
  color: #fff;
  }
  &:hover{
    cursor: pointer;
  }
`

export const Image = styled.img`
  width: 160px;
  height: 160px;
`