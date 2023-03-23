import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../Hooks/useAuth";
import LoginImage from "../../Images/foods/pancake.jpg";
import { RotatingLines } from  'react-loader-spinner'
import img from "../../Images/restoLogodark.png";
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { AiFillTwitterCircle } from 'react-icons/ai';
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
    IMG,
    SocialMedia,
    Icon
} from './LoginElements'
import { toast } from "react-hot-toast";

const Login = () => {

   

      
    const[change,setChange] = useState(false);
    const handleChange = ()=>{
        if(!change){
            setChange(true);
        }else{
            setChange(false);
        }
    }

    const {RegisterUser,logingUser,user,loading,isAuthenticated} = useAuth();
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
            toast.promise(
                RegisterUser(formData),
                {
                    loading:'Registering.....',
                    success: (data)=>`User Registered Successfully`,
                    error:(err)=>{
                        console.log(err.response);
                        if(!err?.response?.data?.message){
                            return 'Something went wrong! Try again'
                        }
                        return `${err.response.data.message}`
                    }
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontSize:'1rem'
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    const loginSubmit = (e)=>{
        e.preventDefault();
        try {
            toast.promise(
                logingUser({Email,Password}),
                {
                    loading:'Logging in .....',
                    success: (data)=>`Logged in successfully`,
                    error:(err)=>{
                        if(!err?.response?.data?.message){
                            return 'Something went wrong! Try again'
                        }
                        return `${err?.response?.data?.message}`
                    }
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontSize:'1rem'
                    }
                }

            )
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(()=>{
        if (!loading && user && isAuthenticated) {
            console.log(user.Role);
            switch (user.Role) {
                case 'Admin':
                    navigate('/AdminDashBoard');
                    break;
                case 'Manager':
                    navigate('/ManagerDashBoard')
                    break;
                case 'Staff-Member':
                    navigate('/Staff-MemberDashBoard')
                    break;
                case 'Supplier':
                    navigate('/SupplierDashBoard')
                    break;
                case 'Deliverer':
                    navigate('/DelivererDashBoard')
                    break;
                
                case 'Customer':
                    navigate('/CustomerDashBoard')
                    
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
                    !change ?

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
                                <Link to='/FrogotPassword' className="btn">
                                    <p>Forgot Your Password ?</p>
                                </Link>
                            </ForgotPWD>
                            <SocialMedia>
                                <Icon><FcGoogle/></Icon>
                                <Icon><SiFacebook style={{color:'#3b5998'}}/></Icon>
                                <Icon><AiFillTwitterCircle style={{color:'#00acee'}}/></Icon>
                            </SocialMedia>
                        <Bottom>
                            {!loading && <RegularButton>Login</RegularButton> }
                            {loading && <RegularButton>
                                <RotatingLines
                                    strokeColor="#fff"
                                    strokeWidth="2"
                                    animationDuration="1"
                                    width="20"
                                    visible={true}
                                />
                            </RegularButton>}
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
                            <SocialMedia>
                                <Icon><SiFacebook style={{color:'#3b5998'}}/></Icon>
                                <Icon><FcGoogle/></Icon>
                                <Icon><AiFillTwitterCircle style={{color:'#00acee'}}/></Icon>
                            </SocialMedia>
                        <Bottom>
                        {loading && <RegularButton>
                                <RotatingLines
                                    strokeColor="#fff"
                                    strokeWidth="2"
                                    animationDuration="1"
                                    width="20"
                                    visible={true}
                                />
                            </RegularButton>}
                            {!loading && <RegularButton>Sign Up</RegularButton>}
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