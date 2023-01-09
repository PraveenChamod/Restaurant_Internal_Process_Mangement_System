import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { Email: '', Password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
  
  // create json web token
  
  export const createToken = (id,Email) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({id,Email},'resturent secret key',{expiresIn:maxAge});
  };

  export const findUser = async (Email)=>{
    return await User.findOne({Email:Email});
}

