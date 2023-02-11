import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../Hooks/useAuth";
import LoginImage from "../../Images/foods/pancake.jpg";

import img from "../../Images/restoLogodark.png";
import { RegularButton } from "../shared/SharedElements/Buttons";
import {
    Page,
    Container,
    LoginPage,
    Heading,
    Logo,
    Title,
    TextArea,
    Label,
    Input,
    ForgotPWD,
    Bottom,
    StyledLink,
    Option,
    LinkToSignUpAndLogIn,
    ImageSection,
    Img,
    SignUpPage,
    TextAreaSignUp,
    Column,
    LabelSignUp,
    InputSignUp,
    IMG
} from './LoginElements'
const Login = () => {
    const[change,setChange] = useState(false);
    const handleChange = ()=>{
        if(!change){
            setChange(true);
        }else{
            setChange(false);
        }
    }

    const {RegisterUser,logingUser,loadUser,user,loading,isAuthenticated} = useAuth();
    const[Name,setName] = useState('');
    const[Email,setEmail] = useState('');
    const[Password,setPassword] = useState('');
    const[ConfirmPassword,setConfirmPassword] = useState('');
    const[ContactNumber,setContactNumber] = useState('');

    const navigate = useNavigate();

    const formData = {Name,Email,Password,ConfirmPassword,ContactNumber};
    const SignupSubmit = async(e)=>{
        e.preventDefault();
        try {
            RegisterUser(formData);  
        } catch (error) {
            console.log(error);
        }
    }

    const loginSubmit = (e)=>{
        e.preventDefault();
        try {
            const loginData = {Email,Password};
            logingUser(loginData);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(()=>{
        if (!loading && user && isAuthenticated) {
            console.log(user);
            switch (user.Role) {
                case 'Admin':
                    navigate('/Admin/DashBoard');
                    break;
                case 'Manager':
                    navigate('/Manager/DashBoard')
                    break;
                case 'Staff-Member':
                    navigate('/Staff-Member/DashBoard')
                    break;
                case 'Supplier':
                    navigate('/Suppliier/DashBoard')
                    break;
                case 'Deliverer':
                    navigate('/Deliverer/DashBoard')
                    break;
                
                case 'Customer':
                    navigate('/Customer/DashBoard')
                    
                    break;
                default:
                    navigate('/login')
                    break;
            }
        }
    },[isAuthenticated,user])
    return(
        <Page>
            <Container>
                {
                    change ?

                    <LoginPage>
                        <Heading>
                            <Logo><IMG src={img}/></Logo>
                            <Title>Login</Title>
                        </Heading>
                        <TextArea onSubmit={loginSubmit}>
                            {/* <Label className="UpperLabel">Email</Label> */}
                            <Input type ="text" name="username" placeholder="Enter the email" value={Email} onChange={e=>setEmail(e.target.value)}/>
                            {/* <Label>Password</Label> */}
                            <Input type ="password" name="Password" placeholder="Enter the password" value={Password} onChange={e=>setPassword(e.target.value)}/>
                            <ForgotPWD>
                                <p>Forgot Your Password ?</p>
                            </ForgotPWD>
                        <Bottom>
                            {!loading && <RegularButton>Login</RegularButton> }
                            <Option>
                                <p>Dosen't have an account ? <LinkToSignUpAndLogIn onClick={handleChange}>Sign Up</LinkToSignUpAndLogIn></p>
                            </Option>
                        </Bottom>
                        </TextArea>
                    </LoginPage> :
        
                    <SignUpPage>
                        <Heading>
                        <Logo><IMG src={img}/></Logo>
                            <Title>Sign Up</Title>
                        </Heading>
                        <TextAreaSignUp onSubmit={SignupSubmit}>
                            <Column>
                                {/* <LabelSignUp className="UpperLabel">Name</LabelSignUp> */}
                                <InputSignUp type ="text" name="Name" placeholder="Enter the full name" value={Name} onChange={e=>setName(e.target.value)}/>
                                <InputSignUp type ="text" name="Email" placeholder="Enter the email" value={Email} onChange={e=>setEmail(e.target.value)}/>
                                {/* <LabelSignUp>Contact No</LabelSignUp> */}
                                <InputSignUp type ="text" name="Contact" placeholder="Enter the contact number" value={ContactNumber} onChange={e=>setContactNumber(e.target.value)}/>
                                {/* <LabelSignUp>Password</LabelSignUp> */}
                                <InputSignUp type ="password" name="Password" placeholder="Enter the password" value={Password} onChange={e=>setPassword(e.target.value)}/>
                                {/* <LabelSignUp className="UpperLabel">Email</LabelSignUp> */}
                                {/* <LabelSignUp>Confirm Password</LabelSignUp> */}
                                <InputSignUp type ="password" name="ConfPassword" placeholder="Re-enter the password" value={ConfirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                            </Column>
                        <Bottom>
                            <RegularButton>Sign Up</RegularButton>
                            <Option>
                                <p>Already have an account ? <LinkToSignUpAndLogIn onClick={handleChange}>Login</LinkToSignUpAndLogIn></p>
                            </Option>
                        </Bottom>
                        </TextAreaSignUp>
                    </SignUpPage>
                }
                <ImageSection>
                    <Img src={LoginImage}/>
                </ImageSection>
            </Container>
        </Page>
    );
}
export default Login;