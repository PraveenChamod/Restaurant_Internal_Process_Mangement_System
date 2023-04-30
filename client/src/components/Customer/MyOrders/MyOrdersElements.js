import styled from "styled-components";
export const Container = styled.div`
  padding: 5%;
`;
export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin-top: 5%;
  @media screen and (max-width: 800px) {
    margin-top: 20%;
  }
`;
export const SubSection1 = styled.div`
  display: flex;
  background-color: #1a1e21;
  box-shadow: 3px 3px 3px #000;
  border-radius: 20px;
  width: 90%;
  padding: 3%;
  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    padding: 2%;
  }
`;
export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2%;
  @media screen and (max-width: 800px) {
    width: 60px;
    height: 60px;
    margin: 2%;
  }
`;
export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  @media screen and (max-width: 800px) {
    width: 60px;
    height: 60px;
  }
`;
export const OrderUserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 60%;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0 3%;
  }
`;
export const LogoSection = styled.div`
  display: flex;
  justify-content: right;
  align-items: flex-end;
  width: 40%;
  height: 250px;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 80px;
    margin: 0;
    justify-content: center;
  }
`;
export const Logo = styled.img`
  width: 400px;
  height: 250px;
  @media screen and (max-width: 800px) {
    width: 160px;
    height: 100px;
  }
`;
export const UserDetails = styled.div`
  font-size: 16px;
  color: #fff;
  margin: 1% 0;
  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;
export const SubSection2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubSection3 = styled.div`
  display: flex;
  width: 100%;
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 3%;
  padding: 0 5%;
  background-color: #1a1e21;
  box-shadow: 3px 3px 3px #000;
  border-radius: 20px;
  @media screen and (max-width: 800px) {
    margin: 3% 0;
    padding: 0 2%;
  }
`;
export const ItemsCard = styled.div`
  & {
    display: flex;
    margin: 3%;
    width: 100%;
    padding: 1% 2%;
    background-color: #1a1e21;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px #000;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
export const ItemsCard1 = styled.div`
  & {
    display: flex;
    margin: 1% 3%;
    width: 100%;
    align-items: center;
    background-color: transparent;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 800px) {
    margin: 0;
  }
`;
export const Details = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  line-height: 0.1rem;
  text-align: left;
`;
export const FoodImage = styled.div`
  height: 90px;
  width: 30%;
  margin: 0 3%;
  @media screen and (max-width: 800px) {
    width: 60px;
    height: 60px;
  }
`;
export const Food = styled.img`
  width: 90px;
  height: 90px;
  @media screen and (max-width: 800px) {
    width: 60px;
    height: 60px;
  }
`;
export const MainText = styled.div`
  color: #fff;
`;
export const FoodName = styled.h2`
  font-size: 24px;
  font-weight: 300;
  @media screen and (max-width: 800px) {
    font-size: 14px;
  }
`;
export const SubText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  justify-content: left;
`;
export const Text = styled.p`
  color: #ffffff;
  font-size: 18px;
  line-height: 0.75px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 800px) {
    line-height: 0px;
    font-size: 10px;
  }
`;
export const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 20px;
  background-color: #1a1e21;
  box-shadow: 3px 3px 3px #000;
  height: fit-content;
  padding: 5%;
  align-items: center;
  justify-content: center;
`;
export const TextSection = styled.div`
  display: flex;
  width: 100%;
  margin: 3% 0;
`;
export const ItemTexts = styled.table`
  display: flex;
  width: 100%;
  font-size: 18px;
  color: #fff;
  flex-direction: column;
  margin: 1% 5%;
`;
export const RadioButtonSection = styled.div`
  width: 100%;
  margin-bottom: 5%;
`;
export const RadioButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Label = styled.div`
  width: 50%;
  float: left;
  text-align: left;
  margin: 2% 0;
  color: #fff;
`;
export const Radio = styled.input``;
export const Data = styled.div`
  width: 50%;
  float: right;
  text-align: right;
  margin: 2% 0;
`;
export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const CartSection = styled.div`
  width: 90%;
  display: flex;
  justify-content: left;
  align-items: center;
  height: fit-content;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0 2%;
  }
`;
export const CartSection1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
`;
export const SelectIcon = styled.div`
  & {
    color: #fff;
    font-size: 32px;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const Icon = styled.div`
  font-size: 32px;
  color: #ffbf00;
  width: 20%;
`;
export const ItemSection = styled.div`
  height: 200px;
  width: 80%;
  background-color: #1a1e21;
  overflow: auto;
  border-radius: 5px;
  border: 2px solid #ffffff9d;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 100px;
  }
`;
export const Icon1 = styled.div`
  display: flex;
  color: #ffbf00;
  margin: 0 1%;
`;
export const Section = styled.div`
  height: 100%;
  width: 80%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
