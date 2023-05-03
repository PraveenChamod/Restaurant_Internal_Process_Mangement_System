import styled from "styled-components";
export const SubContainer = styled.div`
    display: flex;
    width: 60%;
    overflow-x: auto;
    background: #1a1e21;
    border-radius: 20px;
    box-shadow: 3px 3px 3px #000; 
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 769px) {
    width: 90%;
    
  }
`
export const GridContainer = styled.div`
    width: 100%;
    margin: 5%;
`
export const ButtonSection = styled.div`
    position: relative;
    width:60%;
    top: 2%;
`
export const Table = styled.table`
    color: #fff;
    margin: 3%;
    border-radius: 10px;
    width: 80%;

    @media screen and (max-width: 769px) { 
    }
`
export const Tr = styled.tr`
    border: 2px solid #fff;
    text-align: left;

    @media screen and (max-width: 769px) {
        font-size:90%;
        padding:10px;
  }

`
export const Th = styled.th`
   border-bottom: 2px solid #fff;

   @media screen and (max-width: 769px) {
    margin-bottom: 10px;
    padding-bottom:10px;
    &:last-child{
    /* border-bottom:none; */

    }
  }

`
export const Td = styled.td`

@media screen and (max-width: 769px) {
    margin-bottom: 10px;
    
    padding-bottom:10px;
    /* padding-right:5px */
    /* &:last-child{
    border-bottom:none;

    } */

  }


   
`
export const Icon  =styled.div`
    &{
        color: #FFBF00;
    }
    &:hover{
        cursor: pointer;
    }
`