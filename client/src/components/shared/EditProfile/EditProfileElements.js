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
export const Div1 = styled.div`
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
export const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-top:10px;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  @media screen and (max-width:200px){
    border-bottom-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border-top-right-radius: 50%;
  }
`;
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

