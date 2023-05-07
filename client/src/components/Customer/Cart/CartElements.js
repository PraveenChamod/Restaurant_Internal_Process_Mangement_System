import styled from "styled-components";
export const Container = styled.div`
  padding: 5%;
`;
export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  width: 100%;
  margin-top: 5%;
  @media screen and (max-width: 800px) {
    margin-top: 20%;
  }
`;
export const SubSection1 = styled.div`
  display: flex;
  justify-content: left;
  @media screen and (max-width: 800px) {
    align-items: center;
  }
`;
export const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 2%;
`;
export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
export const Name = styled.div`
  font-size: 24px;
  color: #fff;
  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;
export const SubSection2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubSection3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 3%;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0;
  }
`;
export const ItemsCard = styled.button`
  & {
    display: flex;
    margin: 3%;
    width: 100%;
    align-items: center;
    background-color: #1a1e21;
    box-shadow: 3px 3px 3px #000;
    border-radius: 20px;
    padding: 0 3%;
    border: none;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 800px) {
    height: fit-content;
  }
`;
export const Details = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  line-height: 0.1rem;
  text-align: left;
`;
export const FoodImage = styled.div`
  height: 90px;
  width: 30%;
  margin: 3%;
  @media screen and (max-width: 800px) {
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
  width: 100%;
  color: #fff;
`;
export const FoodName = styled.h2`
  font-size: 20px;
  font-weight: 300;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
export const SubText = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Text = styled.p`
  color: #ffffff9d;
  font-size: 18px;
  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;
export const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: 3%;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 3% 0;
  }
`;
export const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 18px;
  color: #fff;
  flex-direction: column;
  margin: 3% 5%;
  @media screen and (max-width: 800px) {
    font-size: 14px;
  }
`;
export const Label = styled.div`
  width: 50%;
  float: left;
  text-align: left;
  margin: 2% 0;
`;
export const Data = styled.div`
  width: 50%;
  float: right;
  text-align: right;
  margin: 2% 0;
`;
export const ButtonSection = styled.div`
  width: 50%;
`;
export const CartSection = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
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
  width: 10%;
  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;

export const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  line-height: 0;
  height: 350px;
`
export const Image1 = styled.img`
  width:500px;
  height: 350px;
  line-height: 0;
`
export const Text1 = styled.h1`
  color: #fff;
` 