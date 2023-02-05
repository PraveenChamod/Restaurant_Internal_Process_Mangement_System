import { FormControl, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './AddTableElements';
const AddTableComponent = () => {
    return ( 
        <Container>
            <Header>ADD TABLE</Header>
            <l.Div>
                <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                    <TextField id="standard-basic" label="Table No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    <TextField id="standard-basic" label="Maximum No of Peoples" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    <TextField id="standard-basic" label="Reservation Charge" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                </FormControl>
                <l.Div1>
                <l.Div2>
                    <FormButton>
                    <Link to="./login" className="btn">
                        Add
                    </Link>
                    </FormButton>
                </l.Div2>
                </l.Div1>
            </l.Div>
            <l.Div3>
                <RegularButton>
                <Link to="./login" className="btn">
                    Back
                </Link>
                </RegularButton>
            </l.Div3>
            </Container>
     );
}
 
export default AddTableComponent;