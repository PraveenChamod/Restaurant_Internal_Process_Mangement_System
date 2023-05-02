import styled from "styled-components";
export const Navbar = styled.div`
  display: block;
  margin: 0;
`;
export const Nav = styled.nav`
  display: flex;
  position: fixed;
  justify-content: space-between;
  background: transparent;
  height: 100px;
  width: 100%;
  z-index: 9999;
`;
export const NavActive = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  color: #fff8e1;
  background: #161a1d;
  height: 100px;
  width: 100%;
  z-index: 9999;
  transition: all 0.5s ease;
`;
export const Links = styled.div`
  display: flex;
  align-items: center;
`;
export const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;

  margin: 0px 20px;
`;
export const Li = styled.li`
  & {
    display: inline-block;
    padding: 0 10px;
    margin: 0 10px;
    font-size: 20px;
    color: white;
    font-family: "PT Sans", sans-serif;
    cursor: pointer;
    position: relative;
  }
  &:hover .Ho {
    width: 50%;
  }
`;
export const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 5%;
`;
export const Span = styled.span`
  & {
    width: 0%;
    height: 2.5px;
    position: absolute;
    top: 80%;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    background: #ffa000;
    z-index: -1;
    transition: 0.5s;
  }
`;
