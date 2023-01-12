import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'resturent secret key',async (err,decodeToken)=>{
            if(err){
                console.log(err.message);
            }
            else{
                console.log(decodeToken);
                req.user = await User.findById(decodeToken.id);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}
