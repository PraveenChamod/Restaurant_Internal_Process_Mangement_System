
import { Div, Div1, Div2, Option, P, UserProfileContainer, ImageSection, Img, Header } from "./UserProfileElements";
import LoginImage from "../../../Images/Services/person.jpg";


import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FormButton } from "../SharedElements/Buttons";


const UserProfileComponent = (props) => {
    const { logout,user,loadUser,loading } = useAuth();
    console.log(user);
    return ( 
        <UserProfileContainer>
            <Div>
                 <Img src={`http://localhost:5000/images/${user?.ProfileImage}`}></Img>
                    <Header>
                        Welcome
                    </Header>
                        <P>Hi {user?.Name}</P>
                    <FormButton>
                        <Link to={props.route1.Route} className="btn">
                            Edit
                        </Link>
                    </FormButton>
            </Div>
        </UserProfileContainer>
     );
}
 
export default UserProfileComponent;