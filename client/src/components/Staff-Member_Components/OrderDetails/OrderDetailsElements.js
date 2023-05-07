import styled from "styled-components";
import Chef from "../../../Images/Chef.png";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(${Chef}) left bottom no-repeat;
  background-size: 21.5rem;
`;

export const Header = styled.h1`
  justify-content: center;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
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
    font-size: 1.5rem;
    letter-spacing: 0.7rem;
  }
`;
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
    height: auto;
  }
`;
export const Div1 = styled.div`
  margin-top: 10px;
  width: 50%;

  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  justify-content: left;
  align-items: left;
  @media screen and (max-width: 769px) {
    align-items: left;
    justify-content: center;
  }
`;
export const Div2 = styled.form`
  margin-top: 0px;
  width: 90%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: row;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  justify-content: left;
  align-items: left;

  @media screen and (max-width: 769px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
  }
`;

export const Div3 = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  width: 90%;
  height: 5%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  justify-content: left;
  align-items: left;
`;

export const Div4 = styled.div`
  margin-top: 0px;
  width: 90%;
  height: 35%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: row;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  justify-content: left;
  align-items: left;
  @media screen and (max-width: 769px) {
    flex-direction: column;
  }
`;
export const Div5 = styled.div`
  margin-top: 0px;
  width: 50%;
  height: 100%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  justify-content: center;
`;

export const Div6 = styled.div`
  margin-top: 0px;
  width: 50%;
  height: 100%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  justify-content: flex-end;
  align-items: flex-end;
  @media screen and (max-width: 769px) {
    justify-content: center;
    align-items: center;
  }
`;
export const Div7 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
`;
export const Div8 = styled.div`
  margin-top: 0px;
  width: 50%;
  height: 100%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  justify-content: left;
  align-items: left;
`;
export const Div9 = styled.div`
  margin-top: 0px;
  width: 50%;
  height: 100%;
  background-color: #1a1e21;
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  justify-content: left;
  align-items: left;
`;
export const SubHeader = styled.h3`
  justify-content: center;
  padding-bottom: 10px;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgb(178, 108, 41) 0%,
    rgb(253, 190, 16) 100%
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 0.25rem;
  margin-bottom: 0px;
  @media screen and (max-width: 769px) {
    justify-content: left;
    align-items: left;
  }
`;
export const FormButton = styled.button`
  position: relative;
  background: linear-gradient(to right, #ffbf00, #b26c29);
  border-radius: 20px;
  border: none;
  font-size: 16px;
  color: #fff;
  font-style: none;
  cursor: pointer;
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 500;
`;

export const Hr = styled.hr`
  width: 100%;
`;
export const ItemsCard = styled.div`
  & {
    display: flex;
    margin: 3%;
    width: 100%;
    align-items: center;
    background-color: transparent;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const Details = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  line-height: 0.1rem;
  text-align: left;
  @media screen and (max-width: 769px) {
    margin-left: 5px;
  }
`;
export const FoodImage = styled.div`
  height: 90px;
  width: 30%;
  margin: 3%;
  @media screen and (max-width: 769px) {
    width: 20%;
    height: 70px;
    margin: 3%;
  }
`;
export const Food = styled.img`
  width: 90px;
  height: 90px;
  @media screen and (max-width: 769px) {
    width: 60px;
    height: 60px;
  }
`;
export const MainText = styled.div`
  color: #fff;
`;
export const FoodName = styled.h2`
  font-size: 20px;
  font-weight: 300;
  @media screen and (max-width: 769px) {
    font-size: 16px;
  }
`;
export const SubText = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Text = styled.p`
  color: #ffffff9d;
  font-size: 16px;
  @media screen and (max-width: 769px) {
    font-size: 12px;
  }
`;
export const CartSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1e21;
`;
export const ItemSection = styled.div`
  height: 280px;
  width: 350px;
  background-color: #1a1e21;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px #000;
  @media screen and (max-width: 769px) {
    width: 300px;
    font-size: 90%;
    /* height: 350px; */
  }
`;
