import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding: 0 0 3% 0;
`;
export const Column1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: #161a1d;
  height: 100%;
  width: 33.33%;
`;
export const Column2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: #b16c29;
  height: 100%;
  width: 33.33%;
  @media screen and (max-width: 800px) {
    position: relative;
    margin-top: -12%;
  }
`;
export const Column3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: #161a1d;
  height: 100%;
  width: 33.33%;
`;
export const Items1 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 3% 0;
  height: auto;
`;
export const Items2 = styled.div``;
export const Items3 = styled.div``;
export const ImageSection1 = styled.div`
  display: flex;
  width: 200px;
  height: 300px;
  border-radius: 0 12rem 12rem 0;
  border: 5px solid #b16c29;
  position: relative;
  left: -40%;
  @media screen and (max-width: 800px) {
    width: 70px;
    height: 150px;
  }
`;
export const Image1 = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 0 12rem 12rem 0;
  object-fit: cover;
  object-position: 100% 0;
  @media screen and (max-width: 800px) {
    width: 70px;
    height: 150px;
  }
`;
export const ImageSection2 = styled.div`
  display: flex;
  width: 200px;
  height: 300px;
  border-radius: 12rem 0 0 12rem;
  border: 5px solid #b16c29;
  position: relative;
  right: -40%;
  @media screen and (max-width: 800px) {
    width: 70px;
    height: 150px;
  }
`;
export const Image2 = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 12rem 0 0 12rem;
  object-fit: cover;
  object-position: 100% 0;
  @media screen and (max-width: 800px) {
    width: 70px;
    height: 150px;
  }
`;
export const Category1 = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #b26c29;
  font-style: italic;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
export const Category2 = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  font-style: italic;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
export const Category3 = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #b26c29;
  font-style: italic;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
export const Meals = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-left: 5%;
`;
export const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  margin: 2% 0;
  @media screen and (max-width: 800px) {
    font-size: 7px;
  }
`;
export const ItemDetails1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #000;
  margin: 2% 0;
  @media screen and (max-width: 800px) {
    font-size: 7px;
  }
`;
export const Price = styled.div`
  width: 30%;
  margin-left: 5%;
  @media screen and (max-width: 800px) {
    margin-left: 0%;
  }
`;
export const ItemName = styled.div`
  width: 70%;
  margin-right: 5%;
  @media screen and (max-width: 800px) {
    margin-right: 0%;
  }
`;
