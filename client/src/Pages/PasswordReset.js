import { FormControl, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../components/shared/SharedElements/Buttons";
import { Container, Header } from "../components/shared/SharedElements/SharedElements";
import { Div, Div1, Div2 } from "./PasswordResetElements";

const PasswordReset = () => {
    return ( 
        <Container>
            <Header>Password Reset</Header>
            <Div>
                <Div1>
                    <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
                    <TextField id="standard-basic" label="Initial Password" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    <TextField id="standard-basic" label="New Password" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    <TextField id="standard-basic" label="Re-Enter New Password" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    <FormButton>
                        <Link to="./login" className="btn">
                            Reset
                        </Link>
                    </FormButton>
                    </FormControl>
                </Div1>
            </Div>
            <Div2>
                <RegularButton>
                    <Link to="./login" className="btn">
                        Back
                    </Link>
                </RegularButton>
            </Div2>
        </Container>
     );
}
 
export default PasswordReset;