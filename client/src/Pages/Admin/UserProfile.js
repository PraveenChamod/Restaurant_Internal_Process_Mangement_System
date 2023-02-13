
import { Div, Div1, Div2, Option, P, UserProfileContainer, ImageSection, Img, FormButton, Header } from "./UserProfileElements";
import LoginImage from "../../Images/Services/person.jpg";
import { Link } from "react-router-dom";


const AdminUserProfile = () => {
    return ( 
        <UserProfileContainer>
            <Div>
                <Div1>
                    <ImageSection>
                        <Img src={LoginImage}></Img>
                    </ImageSection>
                    <Div2>
                        <Header>
                            Welcome
                        </Header>
                        <Option>
                            <P>Hi Praveen!</P>
                        </Option>
                        <FormButton>
                            <Link to="./login" className="btn">
                                Edit
                            </Link>
                        </FormButton>
                    </Div2>
                </Div1>
            </Div>
        </UserProfileContainer>
     );
}
 
export default AdminUserProfile;