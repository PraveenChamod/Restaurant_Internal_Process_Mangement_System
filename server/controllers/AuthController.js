import User from "../models/User.js";
import { createToken, findUser, handleErrors } from "../util/AuthUtil.js";
import { validatePassword } from "../util/PasswordUtility.js";
import jwt from 'jsonwebtoken';
import multer from "multer";

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
                res.status(400).json('Invallid Password');
            }
        }else{
            res.status(400).json('Invallid Email');
        }
    } catch (err) {
        res.status(400).json({ err:message });
    }
    
}

// Method : POST
// End Point : "api/v1/Auth/uploadProfilePicture";
// Description : Upload Profile Image

export const UploadProfileImage =  (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
      jwt.verify(token,'resturent secret key',async (err,decodeToken)=>{
          if(err){
              res.locals.user = null;
              console.log(err.message);
          }
          else{
                const user = await User.findById(decodeToken.id);
                image(req,res,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        user.ProfileImage = req.file.filename;
                        
                    }
                })
                const saveResult = await user.save();
                await User.findByIdAndUpdate(decodeToken.id,saveResult,{new:true});
                next();
            }
        })
    }
}

// Method : GET
// End Point : "api/v1/Auth/getProfile";
// Description : Get User Details
export const getUserProfile = async(req,res)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'resturent secret key',async(err,decodeToken)=>{
            if(err){
                res.locals.user = null;
                console.log(err.message);
            }
            else{
                  const user = await User.findById(decodeToken.id);
                  res.status(200).json(user);
              }
          })
    }
}


// Method : GET
// End Point : "api/v1/Auth/logout";
// Description : Logging Our User
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