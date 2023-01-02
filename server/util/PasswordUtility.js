import bcrypt from 'bcrypt';

export const GenerateSalt = async () =>{
    return await bcrypt.genSalt(); 
}

export const GeneratePassword = async (password, salt)=>{
    return await bcrypt.hash(password,salt);
}