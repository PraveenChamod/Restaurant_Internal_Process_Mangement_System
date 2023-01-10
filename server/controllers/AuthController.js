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
        const existingUser = await findUser(Email);
        console.log(existingUser);
        if(existingUser !== null){
            const result = await validatePassword(Password,existingUser.Password);
            
            if(result){
                const token = createToken(existingUser._id,existingUser.Email);
                console.log(token);
                res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
                res.json(token);
            }
            else{
                throw Error('Incorrect Password');
            }
        }else{
            throw Error('Invalid Email');
        }
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
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
                return res.json(saveResult);
            }
        })
    }
}

// Method : GET
// End Point : "api/v1/Auth/getProfile";
// Description : Get User Details
export const getUserProfile = async(req,res,next)=>{
  const token = req.cookies.jwt;
  if(token){
      jwt.verify(token,'resturent secret key',async (err,decodeToken)=>{
          if(err){
              res.locals.user = null;
              console.log(err.message);
          }
          else{
              let user = await User.findById(decodeToken.id);
              res.locals.user = user;
              res.json(user);
              next();
          }
      })
  }
  else{
      res.locals.user = null;
  }
}


// Method : GET
// End Point : "api/v1/Auth/logout";
// Description : Logging Our User
export const LogoutUser = async (req,res)=>{
  res.cookie('jwt','',{maxAge:1});
  res.json('User Logging Out');
}