import User from "../models/User.js";
import { createToken, findUser, handleErrors } from "../util/AuthUtil.js";
import { validatePassword } from "../util/PasswordUtility.js";
import jwt from 'jsonwebtoken';
import multer from "multer";
import ServiceProviders from "../models/ServiceProviders.js";
import Customer from "../models/Customer.js";
import passport from "passport";
const imageStorage = multer.diskStorage({
    destination:"images/Users",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const image = multer({storage:imageStorage}).single('image');

// Method : POST
// End Point : "api/v1/Auth/LoginUser";
// Description : Login User
const maxAge = 3 * 24 * 60 * 60;
export const LogInUser = async (req,res)=>{
    
    const {Email,Password} = req.body;
    try {
        const existingUser = await User.findOne({Email:Email});
        console.log(existingUser);
        if(existingUser !== null){
            const result = await validatePassword(Password,existingUser.Password);
            
            if(result){
                const token = createToken(existingUser._id,existingUser.Email,existingUser.Role);
                console.log(token);
                res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
                res.json(token);
            }
            else{
                return res.status(400).json({message:"Invallid Password"});
            }
        }else{
            return res.status(400).json({message:"Invallid Email"});
        }
    } catch (err) {
        res.status(400).json({ err:message });
    }
    
}

export const passportSAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
})

export const redirect = async (req, res) => {
    res.redirect('/login'); // Redirect the user to the home page after authentication
  }
// Method : POST
// End Point : "api/v1/Auth/uploadProfilePicture";
// Description : Upload Profile Image

export const UploadProfileImage = async (req,res)=>{
    try {
        const user = req.user;
        console.log(user)
        const findServiceProvider = await ServiceProviders.findOne({Email:user.Email});
        console.log(findServiceProvider);
        const findCustomer = await Customer.findOne({Email:user.Email}); 
        console.log(findCustomer);
        if(findCustomer){
            image(req,res,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        findCustomer.ProfileImage = req.file.filename;
                    }
                })
                const uploadCustomerImage = await findCustomer.save();
                const updateCustomer = await Customer.findByIdAndUpdate(findCustomer.id,uploadCustomerImage,{new:true});
                res.status(201).json({
                    message:'Customer Profile Image Uploaded',
                    data:{
                        updateCustomer
                    }
                })
        }
        else if(findServiceProvider){
            image(req,res,(err)=>{
                if(err){
                    console.log(err)
                }
                else{
                    findServiceProvider.ProfileImage = req.file.filename;
                }
            })
            const uploadServiceProviderImage = await findServiceProvider.save();
            const updateServiceProvider = await ServiceProviders.findByIdAndUpdate(findCustomer.id,uploadServiceProviderImage,{new:true});
            res.status(201).json({
                message:'Service Providers Profile Image Uploaded',
                data:{
                    updateServiceProvider
                }
            })
        }
        else{
            res.status(404).json({
                message:'No user exist',
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

// Method : GET
// End Point : "api/v1/Auth/getProfile";
// Description : Get User Details
export const getUserProfile = async(req,res)=>{
    try {
        const User = req.user;
        const findServiceProvider = await ServiceProviders.findOne({Email:User.Email});
        const findCustomer = await Customer.findOne({Email:User.Email});         
        if(findCustomer){
            const user = findCustomer
                res.status(201).json({
                    message:`Account Details of ${User.Name}`,
                    user
                })
        }
        else if(findServiceProvider){
            const user = findServiceProvider
            res.status(201).json({
                message:`Account Details of ${user.Name}`,
                user
            })
        }
        else{
            res.status(404).json({
                message:'No user exist',
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


// Method : GET
// End Point : "api/v1/Auth/logout";
// Description : Logging Out User
export const LogoutUser = async (req,res)=>{
  res.cookie('jwt','',{maxAge:1});
  res.json('User Logging Out');
}

//
export const PasswordReset = async (req,res)=>{
    try {
        const {Email} = req.params;
        const{InitialPassword,Password,ConfirmPassword} = req.body;
        const user = await User.findOne({Email:Email}).populate('Email');
        const result = await validatePassword(InitialPassword,user.Password);
        if(result){
            await User.findOneAndUpdate({Email:Email},{
                Password:Password,
                ConfirmPassword:ConfirmPassword
            });
            res.status(201).status({message:`Password Reset Successfully`});
        }
        else{
            res.status(402).json({message:`Initial Password is not matched`});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
const createOTP = ()=>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}
const sendOTP = async (req,res)=>{
    try {
        const Email = req.body;
        const user = await User.findOne({Email:Email}).populate('Email');
        const otp= createOTP();
        if(user){
            if(createUser.Role !== "Customer"){
                const mailOption = {
                    from : 'resto6430@gmail.com',
                    to : Email,
                    subject : 'Registration Confrimation',
                    text:`Your OTP is ${otp}`
                }

                transporter.sendMail(mailOption,(err,info)=>{
                    if(err){
                        console.log(err.message);
                    }
                    else{
                        console.log(info.response);
                    }
                })
            }
        }
        else{
            res.status(404).json({message:`Invalid Email`});
        }
    } catch (error) {
        
    }
}

export const FrogotPassword = async (req,res)=>{
    try {
        const {OTP,Password,ConfirmPassword} = req.body;
        const otp = sendOTP();
    } catch (error) {
        
    }
}