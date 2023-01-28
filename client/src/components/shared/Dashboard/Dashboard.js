import React from 'react'
import {
  Container,
  Div,
  SideNavBar,
  Header,
  Menu,
  Cards,
  Pictures,
  Title,
  Name,
  Navs,
  Nav,
  UserHeader,
  Icon,
  NavText,
  Footer,
  Card,
  Count,
  Text,
  Left,
  Right,
  CardIcon
} from './DashbordElements'

const Dashboard = (props) => {

  return (
    <Div>
      <Container>
      <SideNavBar>
        <UserHeader>
          <Title>Admin</Title>
          <Name>Mr.Admin</Name>
        </UserHeader>
        <Navs>
          <Nav>
            <Icon></Icon>
            <NavText></NavText>
          </Nav>
        </Navs>
        <Footer>
          <p></p>
        </Footer>
      </SideNavBar>
      <Menu>
        <Header>

        </Header>
        <Cards>
          <Card>
            <CardIcon></CardIcon>
            <Count></Count>
            <Text></Text>
          </Card>
        </Cards>
        <Pictures>
          <Left></Left>
          <Right></Right>
        </Pictures>
      </Menu>
    </Container>
    </Div>
  )
}

export default Dashboard