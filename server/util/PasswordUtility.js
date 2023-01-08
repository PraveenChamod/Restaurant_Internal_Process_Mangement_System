import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const GenerateSalt = async () =>{
    return await bcrypt.genSalt(12);
}

export const GeneratePassword = async (password,salt)=>{
    return await bcrypt.hash(password,salt);
}

export const validatePassword = async (password,hash)=>{
    return await bcrypt.compare(password,hash);
}

export const SignatureCreate = async (payload)=>{
    return jwt.sign(payload,APP_SECRET,{expiresIn:'1d'});
}