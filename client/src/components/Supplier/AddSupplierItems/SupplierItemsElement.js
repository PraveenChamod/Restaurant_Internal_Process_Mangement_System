import styled from "styled-components";

// export const Container = styled.div`
//     display: flex;
//     justify-content: center;
//     height: 100vh;
//     align-items: center;
//     flex-direction: column;
//     background:url(${Chef}) left bottom no-repeat;
//     background-size: 21.5rem;
//     margin-bottom: 5%;
// `

export const FormSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: auto;
  background-color: #1a1e21;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #000;
  margin: 0;
`;
export const LeftSide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  margin: 0;
  padding: 0 2%;
`;
export const RightSide = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  margin: 0;
  padding: 0 2%;
`;
export const Div3 = styled.div`
  margin-top: 15px;
  width: 50%;
  height: 8%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

export const AddButton = styled.button`
  width: 40px;
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
  font-weight: 800;
  text-transform: uppercase;
  margin-left: auto;
  font-size: 30px;
  @media screen and (max-width: 800px) {
    width: 100px;
    height: 30px;
    font-size: 12px;
  }
`;

export const Table = styled.table`
  border: 2px solid #fff;
  color: #fff;
  margin: 3%;
  border-radius: 10px;
  width: 80%;
`;
export const Tr = styled.tr`
  border: 2px solid #fff;
  text-align: center;
`;
export const Th = styled.th`
  border-bottom: 2px solid #fff;
`;

export const Td = styled.td`
  padding: 0px 8px;

  &:first-child {
    width: 250px;
  }
`;

export const OkButton = styled.button`
  width: 100px;
  height: 30px;
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
  font-weight: 800;
  text-transform: uppercase;
  margin-left: auto;
  font-size: 15px;
  @media screen and (max-width: 800px) {
    width: 100px;
    height: 30px;
    font-size: 12px;
  }
`;

export const RemoveButton = styled.button`
  width: 30px;
  height: 20px;
  color: #fff;
  background: linear-gradient(to right, #ff0000, #990000);
  border: none;
  cursor: pointer;
  position: relative;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 15px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 800px) {
    width: 100px;
    height: 30px;
    font-size: 12px;
  }
`;
