import styled from "styled-components";
export const Navbar = styled.div`
  display: flex;
  margin-bottom: 5%;
`;
export const Nav = styled.nav`
  display: flex;
  position: fixed;
  justify-content: space-between;
  background: transparent;
  height: 100px;
  width: 100%;
  z-index: 9999;

  @media screen and (max-width: 800px) {
    margin-bottom: 5%;
  }
`;
export const Links = styled.div`
  display: flex;
  align-items: center;
`;
export const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 5%;
  @media screen and (max-width: 800px) {
    width: 80px;
    height: 80px;
  }
`;
