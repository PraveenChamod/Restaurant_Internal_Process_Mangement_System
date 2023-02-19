import { FormControl, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FormButton, RegularButton} from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import { Div, Div1, Div2, Div3, Div4, Img, UpdateButton} from "./EditProfileElements";
import LoginImage from "../../../Images/Services/person.jpg";

const EditProfileComponent = () => {
    return (
        <Container>
            <Header>My Profile</Header>
            <Div>
                <Div1>
                    <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
                        <TextField id="standard-basic" label="Email" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="User Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Contact Number" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Role" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Gender" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <FormButton>
                        <Link to="./login" className="btn">
                            Update
                        </Link>
                    </FormButton>
                    </FormControl>          
                </Div1>
                <Div2>
                    <Img src={LoginImage}></Img>
                    <Div4>
                        <UpdateButton>
                                <Link to="./login" className="btn">
                                    Update Profile Picture
                                </Link>
                        </UpdateButton>
                    </Div4>                
                </Div2>
            </Div>
            <Div3>
                <RegularButton>
                    <Link to="./login" className="btn">
                        Back
                    </Link>
                </RegularButton>
            </Div3>
        </Container>
    );
};

export default EditProfileComponent;

