import { useState } from "react";
import styled from "styled-components";
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

    const[Name,setName] = useState();
    const[Email,setEmail] = useState();
    const[Password,setPassword] = useState();
    const[ConfirmPassword,setConfirmPassword] = useState();
    const[ContactNumber,setContactNumber] = useState();

    const onSubmit = (e)=>{
        e.preventDefault();

    }
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
                        <TextArea>
                            {/* <Label className="UpperLabel">Email</Label> */}
                            <Input type ="text" name="username" placeholder="Enter the email"/>
                            {/* <Label>Password</Label> */}
                            <Input type ="password" name="Password" placeholder="Enter the password"/>
                            <ForgotPWD>
                                <p>Forgot Your Password ?</p>
                            </ForgotPWD>
                        </TextArea>
                        <Bottom>
                            <StyledLink to='/'>
                                <RegularButton>Login</RegularButton>
                            </StyledLink>
                            <Option>
                                <p>Dosen't have an account ? <LinkToSignUpAndLogIn onClick={handleChange}>Sign Up</LinkToSignUpAndLogIn></p>
                            </Option>
                        </Bottom>
                    </LoginPage> :
        
                    <SignUpPage>
                        <Heading>
                        <Logo><IMG src={img}/></Logo>
                            <Title>Sign Up</Title>
                        </Heading>
                        <TextAreaSignUp>
                            <Column>
                                {/* <LabelSignUp className="UpperLabel">Name</LabelSignUp> */}
                                <InputSignUp type ="text" name="Name" placeholder="Enter the full name"/>
                                <InputSignUp type ="text" name="Email" placeholder="Enter the email"/>
                                {/* <LabelSignUp>Contact No</LabelSignUp> */}
                                <InputSignUp type ="text" name="Contact" placeholder="Enter the contact number"/>
                                {/* <LabelSignUp>Password</LabelSignUp> */}
                                <InputSignUp type ="password" name="Password" placeholder="Enter the password"/>
                                {/* <LabelSignUp className="UpperLabel">Email</LabelSignUp> */}
                                {/* <LabelSignUp>Confirm Password</LabelSignUp> */}
                                <InputSignUp type ="text" name="ConfPassword" placeholder="Re-enter the password"/>
                            </Column>
                        </TextAreaSignUp>
                        <Bottom>
                            <StyledLink to='/'>
                                <RegularButton>Sign Up</RegularButton>
                            </StyledLink>
                            <Option>
                                <p>Already have an account ? <LinkToSignUpAndLogIn onClick={handleChange}>Login</LinkToSignUpAndLogIn></p>
                            </Option>
                        </Bottom>
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