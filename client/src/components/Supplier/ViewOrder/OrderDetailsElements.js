import styled from "styled-components";
import { Header } from "../../shared/SharedElements/SharedElements";
export const SubContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  height: 60rem;
  flex-direction: column;
`;
export const Sec1 = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  background: #1a1e21;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #000;
  justify-content: center;
  align-items: center;
  height: 50%;
  margin: 2% 0;
`
export const ProfileImage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2%;
  @media screen and (max-width: 800px) {
    width: 60px;
    height: 60px;
    margin: 2%;
  }
`;
export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  @media screen and (max-width: 800px) {
    width: 60px;
    height: 60px;
  }
`;
export const Image1 = styled.img`
  width: 250px;
  height: 170px;
  margin: 0;
`

export const UserDetails = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const TextSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
`
export const TextSection1 = styled(TextSection)`
  font-size: 16px;
`
export const Label = styled.div`
  display: flex;
  justify-content: left;
  width: 40%;
  font-weight: 600;
`
export const Colon = styled.div`
  width: 5%;
`
export const Value = styled.div`
  display: flex;
  justify-content: left;
  width: 55%;
`

export const Sec2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 2% 0;
`
export const SubHeader = styled(Header)`
  font-size: 18px;
  letter-spacing: 0.5rem;
`
export const SubSec1 = styled.form`
  display: flex;
  width: 500%;
  overflow-y: auto;
  background: #1a1e21;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #000;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right:1%;
  flex-direction: column;
`
export const ItemCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  margin: 1%;
  border-bottom: 1px solid #000;
  padding: 1% 2%;
`
export const SubSec2 = styled.div`
  display: flex;
  width: 500%;
  overflow-y: auto;
  background: #1a1e21;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #000;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 1%;
  flex-direction: column;
`
export const ButtonSection = styled.div`
  position: relative;
  left: -25%;
  top: 1%;
  margin-bottom: 2%;
`;
export const ButtonSection1 = styled.div`
  width: 30%;
`
export const Text = styled.h2`
  color: #fff;
  
`
export const ItemCart1 = styled.div`
  display: flex;
  justify-content: center;
  line-height: 0;
  flex-direction: column;
  align-items: center;
  height: 200px;
`
