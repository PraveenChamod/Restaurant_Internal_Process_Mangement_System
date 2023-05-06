import styled from "styled-components";
import { Header } from "../SharedElements/SharedElements";
export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px) {
    margin-top: 15%;
  }
`;
export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 2% 0;
  /* margin-top: 10%; */
  @media screen and (max-width: 769px) {
    flex-direction: column-reverse;
    width: 95%;
  }
`;
export const SubSec = styled.div`
  width: 50%;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  height: fit-content;
`
export const Header1 = styled(Header)`
  font-size: 18px;
  letter-spacing: 0.5rem;
`
export const Div1 = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10%;
  justify-content: left;
  align-items: left;
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

export const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  margin-left: 10%;
  justify-content: right;
  align-items: center;
`;

export const Div3 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;
export const Div4 = styled.div`
  margin-top: 15px;
  width: 80%;
  height: 12%;
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
`;
export const UpdateButton = styled.button`
  position: relative;
  background: linear-gradient(to right, #ffbf00, #b26c29);
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
`;
export const Icon = styled.label`
  & {
    width: fit-content;
    height: fit-content;
    border-radius: 50px;
    background-color: #ffbf00;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    padding: 5%;
    position: relative;
    top: -25%;
    left: -15%;
    color: #fff;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const Image = styled.img`
  width: 160px;
  height: 160px;
`;
