import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  background-size: 21.5rem;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

export const Div = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* background-color:red; */

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;
export const Div1 = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-top: 30px; */
  @media screen and (max-width: 1000px) {
    padding-top: 70px;
  }
`;
export const Div2 = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-top: 30px; */
`;

export const Div3 = styled.div`
  height: 88%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* background-color:lawngreen; */
  /* padding-right: 50px; */
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;
export const Div31 = styled.div`
  height: 95%;
  width: 45%;
  background-color: #1a1e21;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 20px;
    margin-top: 20px;
    width: 60%;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 20px;
    margin-top: 20px;
    width: 80%;
  }
`;

export const Div4 = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    width: 60%;
  }
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
`;

export const Div5 = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Div6 = styled.div`
  height: 12%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const Div7 = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
`;
export const H1 = styled.h1`
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
  letter-spacing: 0.25rem;
  margin-top: 20px;
`;
export const Item = styled.button`
  width: 160px;
  height: 100px;
  color: black;
  background: white;
  /* border-style: solid;
    border-color:yellow; */
  border: 5px solid yellow;
  cursor: pointer;
  position: relative;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
`;
export const ClickedItem = styled(Item)`
  border: 5px solid #04c411;
`;

export const RegularButton = styled.button`
  width: 150px;
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
  margin-left: 200px;
  margin-right: 200px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

export const H2 = styled.h1`
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
  font-family: cursive;
`;
export const Table = styled.div`
  margin: 2%;
`;
export const Payment = styled.div`
  width: 90%;
  margin: 3%;
`;
export const SubHeader = styled.h3`
  justify-content: center;
  padding-bottom: 10px;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  color: #fff;
  margin-bottom: 0px;
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