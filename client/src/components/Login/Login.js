import { useState } from "react";
import styled from "styled-components";
import LoginImage from "../../Images/foods/pancake.jpg";
import { Link } from 'react-router-dom';
const Login = () => {
    const Page = styled.div`
        height: 100vh;
        display: flex;
        justify-content: center;
        
    `
    const Container = styled.div`
        background-color: #000;
        display: flex;
        width: 79%;
        height: auto;
        margin: 5%;
        border-radius: 20px;
        @media screen and (max-width:769px){
            flex-direction: column;
            width: 90%;
            justify-content: center;
            align-items: center;
        }
    `
    const LoginPage = styled.div`
        width: 50%;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @media screen and (max-width:769px){
            width: 90%;
            border-bottom-left-radius: 0px;
            border-top-right-radius: 20px;
            border-top-left-radius: 20px;
            height: 350px;
        }
    `
    const Heading = styled.div`
        width: 90%;
        height: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `
    const Logo = styled.h1`
        color: #fff;
        margin: 0;
        padding: 0;
    `
    const Title = styled.h2`
        color: sienna;
        margin: 0;
        padding: 0;
        text-decoration: underline;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    `
    const TextArea = styled.div`
        width: 90%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `
    const Label = styled.label`
        font-size: 1.5em;
        color: #fff;
        margin-top: 0.5em;
        letter-spacing: 0.1rem;
        .UpperLabel{
            margin-top: 0;
        }
        @media screen and (max-width:769px){

            font-size: 20px;
        }
    `
    const Input = styled.input`
        height: 30px;
        width: 50%;
        padding: 0 3%;
        border-radius: 20px;
        border: none;
        @media screen and (max-width:769px){
            width: 200px;
            height: 30px;
            font-size: 12px;
        }
    `
    const ForgotPWD = styled.div`
        width: 50%;
        text-align: right;
        color: #febf10;
        font-size: 80%;
        margin: 0;
        &:hover{
            cursor: pointer;
        }
    `
    const Bottom = styled.div`
        width: 90%;
        height: 15%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media screen and (max-width:769px){
            height: 20%;
            font-size: 12px;
        }
    `
    const StyledLink = styled(Link)`
        font-size: 1.2em;
        text-decoration: none; 
        color: #fff;
        @media screen and (max-width:800px){
            font-size: 14px;
        }
    `
    const Button = styled.div`
        width: 85px;
        height: 28px;
        margin: 0;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #ba9035, #a0522d);
        color: #fff;
        @media screen and (max-width:800px){
            height: 20px;
        }
    `
    const Option = styled.div`
        color: #febf10;
        font-size: 100%;
        margin: 0 2%;
        @media screen and (max-width:769px){
            font-size: 14px;
        }
    `
    const LinkToSignUpAndLogIn = styled.a`
        &:hover{
            cursor: pointer;
        }
    `
    const ImageSection = styled.div`
        width: 50%;
        overflow: hidden;
        @media screen and (max-width:769px){
            width: 100%;
            overflow: hidden;
        }
    `
    const Img = styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        @media screen and (max-width:800px){
            border-bottom-left-radius: 20px;
            border-top-right-radius: 0px;
        }
    ` 
    const SignUpPage = styled.div`
        width: 50%;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @media screen and (max-width:769px){
            width: 90%;
            border-bottom-left-radius: 0px;
            border-top-right-radius: 20px;
            border-top-left-radius: 20px;
            height: 350px;
        }
    `
    const TextAreaSignUp = styled.div`
        display: flex;
        flex-direction: row;
        width: 90%;
        height: 60%;
    `
    const Column = styled.div`
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
    `
    const LabelSignUp = styled.label`
        font-size: 1.2em;
        color: #fff;
        margin-top: 1em;
        letter-spacing: 0.1rem;
        .UpperLabel{
            margin-top: 0;
        }
        @media screen and (max-width:1010px){
            font-size: 0.8em;
        } 
    `
    const InputSignUp = styled.input`
    height: 30px;
    width: 90%;
    padding: 0 3%;
    border-radius: 20px;
    border: none;
    @media screen and (max-width:769px){
        width: 90%;
        height: 25px;
        font-size: 12px;
    }
`
    const[change,setChange] = useState(false);
    const handleChange = ()=>{
        if(!change){
            setChange(true);
        }else{
            setChange(false);
        }
    }
    return(
        <Page>
            <Container>
                {
                    change ?

                    <LoginPage>
                        <Heading>
                            <Logo>Resto</Logo>
                            <Title>Login</Title>
                        </Heading>
                        <TextArea>
                            <Label className="UpperLabel">Email</Label>
                            <Input type ="text" name="username"/>
                            <Label>Password</Label>
                            <Input type ="text" name="Password"/>
                            <ForgotPWD>
                                <p>Forgot Your Password ?</p>
                            </ForgotPWD>
                        </TextArea>
                        <Bottom>
                            <StyledLink to='/'>
                                <Button>Login</Button>
                            </StyledLink>
                            <Option>
                                <p>Dosen't have an account ? <LinkToSignUpAndLogIn onClick={handleChange}><u>Sign Up</u></LinkToSignUpAndLogIn></p>
                            </Option>
                        </Bottom>
                    </LoginPage> :
        
                    <SignUpPage>
                        <Heading>
                            <Logo>Resto</Logo>
                            <Title>Sign Up</Title>
                        </Heading>
                        <TextAreaSignUp>
                            <Column>
                                <LabelSignUp className="UpperLabel">Name</LabelSignUp>
                                <InputSignUp type ="text" name="Name"/>
                                <LabelSignUp>Contact No</LabelSignUp>
                                <InputSignUp type ="text" name="Contact"/>
                                <LabelSignUp>Password</LabelSignUp>
                                <InputSignUp type ="text" name="Password"/>
                            </Column>
                            <Column>
                                <LabelSignUp className="UpperLabel">Email</LabelSignUp>
                                <InputSignUp type ="text" name="Email"/>
                                <LabelSignUp>Address</LabelSignUp>
                                <InputSignUp type ="text" name="Address"/>
                                <LabelSignUp>Confirm Password</LabelSignUp>
                                <InputSignUp type ="text" name="ConfPassword"/>
                            </Column>
                        </TextAreaSignUp>
                        <Bottom>
                            <StyledLink to='/'>
                                <Button>Sign Up</Button>
                            </StyledLink>
                            <Option>
                                <p>Already have an account ? <LinkToSignUpAndLogIn onClick={handleChange}><u>Login</u></LinkToSignUpAndLogIn></p>
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