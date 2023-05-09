import styled from "styled-components";

export const Div = styled.div`
  width: 50%;
  height: 100%;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  padding: 3% 0;
  /* margin-top: 10%; */
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const ImageSection = styled.div`
  height: 250px;
  border-radius: 20px;
  margin-bottom: 10%;
`;
export const ImageSubSec = styled.div`
  width: 250px;
  height: 250px;
  margin: 5%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 20px;
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
    left: 0%;
    color: #fff;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const Div2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5% 0;
  width: 40%;
`;

export const Sec = styled.div`
  width: 50%;
  display: flex;
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

export const Searchbar = styled.input`
  margin: 2%;
  width: 60%;
  height: 20px;
  border-radius: 30px;
  padding: 1% 5%;
`;

export const TextFeild = styled.input`
  margin: 2%;
  width: 60%;
  height: 20px;
  border-radius: 30px;
  padding: 1% 5%;
`;
export const Text = styled.div`
  color: #fff;
  display: flex;
  justify-content: left;
  text-align: left;
  width: 70%;
  font-size: 18px;
  font-weight: 600;
`;
export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
`;
export const RadioButtonSection = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  align-items: center;
`;
export const RadioButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5%;
`;
export const Label = styled.div`
  width: 100%;
  text-align: left;
  margin: 3% 0;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;
export const Radio = styled.input``;
export const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  flex-direction: column;
  line-height: 0;
`
export const Image1 = styled.img`
  width: 100%;
  height: 100%;
  line-height: 0;
`
export const Text1 = styled.h1`
  color: #fff;
  text-align: center;
` 