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
  padding: 2% 0;
  /* margin-top: 10%; */
  @media screen and (max-width: 769px) {
    width: 90%;
    height: 350px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
`;
export const Div2 = styled.div`
  margin-right: 70px;
`;
export const Div3 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

export const Div4 = styled.div`
  margin-top: 15px;
`;

export const Table = styled.table`
    border: 2px solid #fff;
    color: #fff;
    margin: 3%;
    border-radius: 10px;
    width: 80%;
`
export const Tr = styled.tr`
    border: 2px solid #fff;
    text-align: center;
`
export const Th = styled.th`
   border-bottom: 2px solid #fff;
`
export const Td = styled.td`
   
`

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    overflow-x: auto;
    background: #1a1e21;
    border-radius: 20px;
    box-shadow: 3px 3px 3px #000;
    justify-content: center;
    align-items: center;
    padding-bottom: 1%;
`

export const ButtonSection = styled.div`
    position: relative;
    left: -25%;
    top: 2%;

`

export const Icon  =styled.div`
    &{
        color: #FFBF00;
    }
    &:hover{
        cursor: pointer;
    }
`

export const ConfirmButton = styled.button`
    width: 100px;
    height: 40px;
    color:#fff;
    background: linear-gradient(to right, #FFBF00, #B26C29);
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
    @media screen and (max-width: 800px){
        width: 100px;
        height: 30px;
        font-size: 12px;
        
    }
`