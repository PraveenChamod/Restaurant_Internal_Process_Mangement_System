import ServiceProviders from "../models/ServiceProviders.js";
import User from "../models/User.js";
import { createToken } from "../util/AuthUtil.js";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";

// Method : POST
// End Point : "api/v1/admin/RegisterServiceProvider";
// Description : Register Outlet Staff

const maxAge = 3 * 24 * 60 * 60;
export const RegisterOutletStaff = async (req,res)=>{
    const {Password,Email,Role} = req.body;
    const existingStaffMember = await ServiceProviders.findOne({Email:Email});
    const existingUser = await User.findOne({Email:Email});

    try {
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
                const token = createToken(createUser._id,createUser.Email);
                res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
                res.json(token);
            }else{
                res.status(401).json('Role must be Staff-member or Deliverer');
            }
        }
    
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
    
}

