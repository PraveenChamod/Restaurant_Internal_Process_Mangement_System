import {
  Div,
  Div1,
  Div2,
  Option,
  P,
  UserProfileContainer,
  ImageSection,
  Img,
  Header,
  ButtonSection,
} from "./UserProfileElements";
import LoginImage from "../../../Images/Services/person.jpg";

import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FormButton, RegularButton } from "../SharedElements/Buttons";

const UserProfileComponent = (props) => {
  const { logout, user, loadUser, loading } = useAuth();
  console.log(user);
  return (
    <UserProfileContainer>
      <Div>
        <Img src={`https://resto-f3zu.onrender.com/images/${user?.ProfileImage}`}></Img>
        <Header>Welcome</Header>
        <P>Hi {user?.Name}</P>
        <RegularButton>
          <Link to={props.route1.Route} className="btn">
            Edit
          </Link>
        </RegularButton>
      </Div>
      <ButtonSection>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </ButtonSection>
    </UserProfileContainer>
  );
};

export default UserProfileComponent;
