import styled from "styled-components";
export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    
`
export const Container = styled.div`
    width: 70%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1A1E21;
    box-shadow: 3px 3px 3px #000;
    border-radius:20px;
    margin: 10% 0;
`
export const SideNavBar = styled.div`
    width: 35%;
    height: 100%;
    background-color: #FDBE10cd;
    border-radius:20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4% 0;
`
export const UserHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    margin: 3% 0;
`
export const Title = styled.div`
    font-size: 30px;
    letter-spacing: 0.25rem;
    font-weight: 500;
`
export const Name = styled.div`
    font-size: 18px;
    letter-spacing: 0.15rem;
`
export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`
export const Header = styled.h2`
    background:linear-gradient(60deg, rgb(178,108,41) 0%, rgb(253,190,16) 100%);
    color: transparent;
    font-size: 4rem;
        text-transform: uppercase;
        font-family: "Lato", sans-serif;
        font-weight: 600;
        -webkit-background-clip: text;
        background-clip: text;
        letter-spacing: 1.5rem;
`
export const Menu = styled.div`
    display: flex;
  
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 65%;
`
export const Cards = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-top: 5%;
`

export const Navs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    margin-top: 5%;
    padding-left: 20%;
`
export const Nav = styled.div`
    &{
    display: flex;
    justify-content: space-between;
    align-items: left;
    width: 100%;
    height: 40px;
    margin: 2% 0;
    letter-spacing: 0.15rem;
    }
    &:hover{
        cursor: pointer;
    }
    
`
export const Icon = styled.div`
    width: 20%;
`
export const NavText = styled.div`
    width: 80%;
    color: #fff;
    font-size: 18px;
`
export const Footer = styled.div`
    color: #fff;
    
`
export const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    background: #000;
    margin: 0 2%;
    border-radius: 20px;
    box-shadow: 3px 3px 3px #FDBE10ad;
`
export const CardIcon = styled.div`
    color: #fff;
    font-size: 45px;
`
export const Count = styled.div`
    background:linear-gradient(60deg, rgb(178,108,41) 0%, rgb(253,190,16) 100%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 25px;
    letter-spacing: 0.25rem;
    text-align: center;
    font-weight: 600;
    margin: 0;

`
export const Text = styled.div`
    color: #fff;
`
export const Pictures = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 5%;
`
export const Image=styled.img`
    width: 150px;
    height: 150px;
`
export const Left = styled.div`
    width: 150px;
    height: 100%;
    
`
export const Right = styled.div`
    width: 150px;
    height: 100%;
`
