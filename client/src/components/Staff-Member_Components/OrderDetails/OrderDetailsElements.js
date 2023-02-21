//style 
import styled from "styled-components";

export const MainFormDiv = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
flex-direction:column;

width: 70%;
 height: 100%;
 /* overflow-y: auto; */
 background-color: #1A1E21;
 box-shadow: 3px 3px 3px #000;
 border-radius:20px;
 margin: 10% 0 0 0;

`
export const ToptArea = styled.div`
display:flex;
justify-content:center;
align-items: center;
flex-direction:row;
`
export const LeftForm = styled.div`
display:flex;
justify-content:center;
 /* align-items: center; */
margin-right:8%;
flex-direction:column;
`
export const RightForm = styled.div`
display:flex;
justify-content:center;
/* align-items: center; */
margin-left:8%;
flex-direction:column;
`
export const Hr = styled.hr`
/* width:100% */
`

export const BottomArea = styled.div`
width:70%;
display:flex;
justify-content:center;
align-items: center;
flex-direction:column;
`
export const TitleText = styled.h3`
justify-content: center;
    text-transform:uppercase;
  align-items: flex-start;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgb(178, 108, 41) 0%,
    rgb(253, 190, 16) 100%
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: .5rem;
`
export const BottomLeftForm = styled.div`
display:flex;
justify-content:center;
align-items:flex-start;
flex-direction:column;
margin-right:50%;
`
export const BottomRightForm = styled.div`
display:flex;
justify-content:center;
align-items: flex-end;
margin-left:100%;
margin-bottom:3%;
flex-direction:column;
`
export const BackButton = styled.div`
display:flex;
justify-content:center;
align-items:flex-start;
margin-right:60%;
margin-top:20px;
margin-bottom:100px;

`