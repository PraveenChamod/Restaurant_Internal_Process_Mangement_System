import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import { Container, Header } from "../shared/SharedElements/SharedElements";
import { Div, Div1, Div2 } from "./PasswordResetElements";

const PasswordResetComponent = (props) => {
    const[InitialPassword,setInitialPassword] = useState('');
    const[Password,setPassword] = useState('');
    const[ConfirmPassword,setConfirmPassword] = useState('');

    const resetPassword = async(e)=>{
        e.preventDefault();
        try {
            const formData = {InitialPassword,Password,ConfirmPassword};
            await toast.promise(
                axios.patch(`api/v1/User/resetpassword/${props.email}`,formData),
                {
                    loading:`Resetting Password....`,
                    success:(data)=>{
                      console.log({ data });
                      return ` ${data.data?.message} ` || "success";
                    },
                    error: (err) => `${err.response.data.message}`,
                  },
                  {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontSize:'1rem',
                        zIndex:'99999999'
                    }
                  }
            )
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <Container>
            <Header>Password Reset</Header>
            <Div>
                <Div1 onSubmit={resetPassword}>
                    <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
                    <TextField 
                        id="standard-basic" 
                        label="Initial Password" 
                        variant="standard" 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}}
                        value={InitialPassword}
                        onChange={e=>setInitialPassword(e.target.value)} 
                    />
                    <TextField 
                        id="standard-basic" 
                        label="New Password" 
                        variant="standard" 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}}
                        value={Password}
                        onChange={e=>setPassword(e.target.value)} 
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Re-Enter New Password" 
                        variant="standard" 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}}
                        value={ConfirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)} 
                    />
                    <FormButton>
                        Reset
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
 
export default PasswordResetComponent;