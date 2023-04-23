import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
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

  const { logout,user,loadUser } = useAuth();
  const data1 = Array.from(props.Navs1.Navs);

  const cardData = Array.from(props.cards1.CardContent);
  console.log(user);
  const onclick = (link)=>{
    if(link === '/login'){
      logout();
    }
  }
  return (
    <Div>
      <Container> 
      <SideNavBar>
        {
          props.view ? 
          null
          :
          <HeaderContainer>
            <Header>
              Welcome
            </Header>
          </HeaderContainer>
        }
        <UserHeader>
          <Title>{props.Navs1.Role}</Title>
          <Name>{user.Name}</Name>
        </UserHeader>
        <Navs>
          {
            data1.map(data=>{
              return(
                <Link to = {data.link} onClick={()=>{onclick(data.link)}} className='btn'>
                  <Nav>
                    <Icon>{data.icon}</Icon>
                    <NavText>{data.text}</NavText>
                  </Nav>        
                </Link>
              )
            })
          }
        </Navs>
        <Footer>
          <p>@2023 RESTO | ALL RIGHTS RESERVED</p>
        </Footer>
      </SideNavBar>
      {
        props.view ?
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
        </Menu> : null
      }
    </Container>
    </Div>
  )
}

export default Dashboard