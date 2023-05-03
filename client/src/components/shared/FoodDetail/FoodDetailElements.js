import styled from "styled-components";

export const Div = styled.form`
  width: 50%;
  height: fit-content;
  background-color: #1a1e21;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 3px 3px #000;
  padding: 1% 0;
  /* margin-top: 10%; */
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;
export const H1 = styled.h1`
  justify-content: center;
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
`;

export const Div1 = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  height: 80%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 5%;
  margin-bottom: 2%;
  @media screen and (max-width: 200px) {
  }
`;
export const Div2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5% 0;
  width: 100%;
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
  width: 100%;
  margin-bottom: 5px;
  padding: 6px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  box-shadow: 3px 3px 3px #000;
`;

export const TextFeild = styled.input`
  margin: 2%;
  width: 100%;
  height: 30px;
  border-radius: 30px;
  padding: 1% 5%;
`;
export const Text = styled.div`
  color: #fff;
  display: flex;
  justify-content: left;
  text-align: left;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
`;
export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  justify-content: center;
  align-items: center;
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
