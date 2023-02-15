import React from 'react';
import leftImage from '../../../Images/InnerUi/chef.png';
import rightImage from '../../../Images/InnerUi/lime.png'
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
  CardIcon,
  HeaderContainer,
  Image
} from './DashbordElements'

const Dashboard = (props) => {

  const data1 = Array.from(props.Navs1.Navs);

  const cardData = Array.from(props.cards1.CardContent);

  return (
    <Div>
      <Container> 
      <SideNavBar>
        <UserHeader>
          <Title>{props.Navs1.Role}</Title>
          <Name>Mr.Admin</Name>
        </UserHeader>
        <Navs>
          {
            data1.map(data=>{
              return(
                <Nav>
                  <Icon>{data.icon}</Icon>
                  <NavText>{data.text}</NavText>
                </Nav>
              )
            })
          }
        </Navs>
        <Footer>
          <p>@2023 RESTO | ALL RIGHTS RESERVED</p>
        </Footer>
      </SideNavBar>
      <Menu>
        <HeaderContainer>
          <Header>
            Welcome
          </Header>
        </HeaderContainer>
        <Cards>
          {
            cardData.map(data=>{
              return(
                <Card>
                  <CardIcon>{data.icon}</CardIcon>
                  <Count>{data.count}</Count>
                  <Text>{data.text}</Text>
                </Card>
              )
            })
          }
        </Cards>
        <Pictures>
          <Left>
            <Image src={leftImage}/>
          </Left>
          <Right>
            <Image src={rightImage}/>
          </Right>
        </Pictures>
      </Menu>
    </Container>
    </Div>
  )
}

export default Dashboard