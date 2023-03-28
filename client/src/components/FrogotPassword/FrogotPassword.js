import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import { Container, Header } from "../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3} from'./FrogotPasswordElements';
const ForgotPasswordComponent = () => {
  
  const[OTP,setOtp] = useState(0);
  const[Email,setEmail] = useState("");
  const[Password,setPassword] = useState("");
  const[ConfirmPassword,setConfirmPassword] = useState("");
console.log(OTP);
  const sendOtp = async(e)=>{
    e.preventDefault();
    try {
      await toast.promise(
        axios.post('api/v1/Auth/OTP',{Email:Email}),
        {
          loading:`Sending OTP....`,
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
              zIndex:'99999999',
              width:'fit-content'
          }
        }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  const formData = {Email,OTP,Password,ConfirmPassword}
  const resetPassword = async(e)=>{
    e.preventDefault();
    try {
      await toast.promise(
        axios.patch('api/v1/Auth/Forgotpassword',formData),
        {
          loading:`Loading.....`,
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
              zIndex:'99999999',
              width:'fit-content'
          }
        }
      )
    } catch (error) {
      
    }
  }
  return (
    <Container>
      <Header>Forgot Password</Header>
      <Div>
        <Div1 onSubmit={sendOtp}>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
            <TextField 
              id="standard-basic" 
              label="Email" 
              variant="standard" 
              InputLabelProps={{className:'textFeild_Label'}} 
              sx={{marginBottom:'10%'}} 
              InputProps={{
                style: { color: '#fff' },
              }}
              value={Email}
              onChange={e=>setEmail(e.target.value)}
            />
            <FormButton>
                Send OTP
            </FormButton>
          </FormControl>
        </Div1>
        <Div1 onSubmit={resetPassword}>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <Div2>
              <TextField 
                id="standard-basic" 
                label="OTP" 
                variant="standard" 
                InputLabelProps={{className:'textFeild_Label'}} 
                sx={{marginBottom:'10%'}} 
                InputProps={{
                  style: { color: '#fff' },
                }}
                value={OTP}
                onChange={e=>setOtp(e.target.value)}
              />
            </Div2>
            <Div2>
              <TextField 
                id="standard-basic" 
                label="Enter New Password" 
                variant="standard" 
                InputLabelProps={{className:'textFeild_Label'}} 
                sx={{marginBottom:'10%'}}
                type="password" 
                InputProps={{
                  style: { color: '#fff' },
                }}
                value={Password}
                onChange={e=>setPassword(e.target.value)}
              />
              <TextField 
                id="standard-basic" 
                label="Re-Enter New Password" 
                variant="standard" 
                InputLabelProps={{className:'textFeild_Label'}} 
                sx={{margin:'0 0 10% 10%'}}
                type="password" 
                InputProps={{
                  style: { color: '#fff' },
                }}
                value={ConfirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
              />
            </Div2>
            <FormButton>
                Reset
            </FormButton>
          </FormControl>
        </Div1>
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

export default ForgotPasswordComponent;
