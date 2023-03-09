
import { Div, Div1, Div2, Option, P, UserProfileContainer, ImageSection, Img, FormButton, Header } from "./UserProfileElements";
import LoginImage from "../../../Images/Services/person.jpg";


import { Link } from "react-router-dom";


const UserProfileComponent = (props) => {
    return ( 
        <UserProfileContainer>
            <Div>
                 <Img src={LoginImage}></Img>
                    <Header>
                        Welcome
                    </Header>
                        <P>Hi Praveen!</P>
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