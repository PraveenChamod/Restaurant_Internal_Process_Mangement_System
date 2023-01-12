import ServiceProviders from "../models/ServiceProviders.js";
import User from "../models/User.js";
import { createToken } from "../util/AuthUtil.js";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import jwt from 'jsonwebtoken';

// Method : POST
// End Point : "api/v1/admin/RegisterServiceProvider";
// Description : Register Outlet Staff

const maxAge = 3 * 24 * 60 * 60;
export const RegisterOutletStaff = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role == "Manager"){
            const {Password,Email,Role} = req.body;
            const existingStaffMember = await ServiceProviders.findOne({Email:Email});
            const existingUser = await User.findOne({Email:Email});
            if(existingStaffMember !== null || existingUser !== null){
                return res.json({"message":"A User is already exist"});
            }
            else{
                const salt = await GenerateSalt();
                const encryptedPassword = await GeneratePassword(Password,salt);
                if(Role === "Staff-Member" || Role === "Deliverer" ){
                    const createServiceProvider = await ServiceProviders.create({
                        Password:encryptedPassword,
                        Email:Email,
                        Role:Role
                    });
                    const createUser = await User.create({
                        Password:encryptedPassword,
                        Email:Email,
                        Role:Role
                    })
                    //send Email
                    const mailOption = {
                        from : 'resto6430@gmail.com',
                        to : Email,
                        subject : 'Registration Confrimation',
                        text : `Hi ${Name} Welcome to Resto. You successfully registered to the system.`
                    }

                    transporter.sendMail(mailOption,(err,info)=>{
                        if(err){
                            console.log(err.message);
                        }
                        else{
                            console.log(info.response);
                        }
                    })
                    const token = createToken(createUser._id,createUser.Email);
                    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
                    res.json(token);
                }else{
                    res.status(401).json('Role must be Staff-member or Deliverer');
                }
            }
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

export const addItems = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {ItemName,Quantity,UnitPrice,WholeSalePrice,Category} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);

        }
    } catch (error) {
        
    }
}