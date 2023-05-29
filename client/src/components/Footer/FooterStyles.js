import styled from "styled-components";

export const Box = styled.div`
  background: transparent;
  position: center;
  @media screen and (max-width: 800px) {
    margin: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  /* background: red; */
  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    justify-content: center;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  @media screen and (max-width: 800px) {
    display: flex;
    width: 35%;
    margin-left: 5%;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 10%;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 16px;
  text-decoration: none;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }

  &:hover {
    color: #febf10;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 22px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  @media screen and (max-width: 1000px) {
    font-size: 1em;
  }
`;

export const H2 = styled.h2`
  color: #fff;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 1em;
  }
`;

export const P = styled.p`
  color: #fff;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

export const Sec = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 0.5%;
`;
export const Image = styled.img`
  width: 30px;
  height: 30px;
`;
export const HR = styled.hr`
  border: none;
  background: #ffffff2d;
  height: 2px;
  margin: 10px 0;
`;

export const Span = styled.span`
  & {
    width: 0%;
    height: 2.5px;
    position: absolute;
    top: 80%;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    background: #ffa000;
    z-index: -1;
    transition: 0.5s;
  }
`;
