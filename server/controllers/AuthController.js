import User from "../models/User.js";
import { createToken, findUser, handleErrors } from "../util/AuthUtil.js";
import {
  GeneratePassword,
  GenerateSalt,
  validatePassword,
} from "../util/PasswordUtility.js";
import multer from "multer";
import ServiceProviders from "../models/ServiceProviders.js";
import Customer from "../models/Customer.js";
import path from "path";
import ejs from "ejs";
import { transporter } from "../util/NotificationUtil.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import ShoutoutClient from "shoutout-sdk";

var apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTU0YTA3MC0yYTBkLTExZWQtYTIyZC0yMzNlNTJkNzg3MDYiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2MjA0NzQ4OSwiZXhwIjoxOTc3NjY2Njg5LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczMzgxIiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.7ODAC-X1QFiFFKMpoe23iD-mpEPRkO6twmBsvQvgnOM";

var debug = true,
  verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

const imageStorage = multer.diskStorage({
  destination: "images/Users",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const image = multer({ storage: imageStorage }).single("image");
const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);
const clientId =
  "810530431238-ihd5ug241fdi5g07hfc0es3qfvri236q.apps.googleusercontent.com";
const clientSecret = "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";

export const strategy = new GoogleStrategy(
  {
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "/api/v1/Auth/callback",
    scope: ["profile", "email"],
  },
  async (accesstoken, refreshtoken, profile, done) => {
    const user1 = await Customer.findOne({
      Email: profile.emails[0].value,
    }).populate("Email");

    if (user1) {
      const token = createToken(user1.id, user1.Email, user1.Role);
      return done({ user1, token });
    } else {
      const salt = await GenerateSalt();
      const pwd = Math.random().toString(36).substring(2, 10);
      const encryptedPassword = await GeneratePassword(pwd, salt);
      const confirmEncryptedPassword = await GeneratePassword(pwd, salt);
      const newUser = await Customer.create({
        Name: profile.displayName,
        Password: encryptedPassword,
        ConfirmPassword: confirmEncryptedPassword,
        Email: profile.emails[0].value,
        ProfileImage: profile.photos[0].value,
        Role: "Customer",
      });
      const token = createToken(newUser.id, newUser.Email, newUser.Role);
      return done({ newUser, token });
    }
  }
);
export const serialize = (user, done) => {
  done(user);
};
export const deserialize = async (id, done) => {
  const user = await Customer.findById(id);
  done(user);
};

// Method : POST
// End Point : "api/v1/Auth/LoginUser";
// Description : Login User
const maxAge = 3 * 24 * 60 * 60;
export const LogInUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const existingCustomer = await Customer.findOne({ Email: Email });
    const existingServiceProvider = await ServiceProviders.findOne({
      Email: Email,
    });
    if (existingCustomer !== null) {
      const result = await validatePassword(
        Password,
        existingCustomer.Password
      );

      if (result) {
        const token = createToken(
          existingCustomer._id,
          existingCustomer.Email,
          existingCustomer.Role
        );
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json(token);
      } else {
        res.status(400).json({
          status: "Error",
          message: "Invalid Password",
        });
      }
    } else if (existingServiceProvider !== null) {
      if (existingServiceProvider.Status !== "Deactive") {
        const result = await validatePassword(
          Password,
          existingServiceProvider.Password
        );

        if (result) {
          const token = createToken(
            existingServiceProvider._id,
            existingServiceProvider.Email,
            existingServiceProvider.Role
          );
          console.log(token);
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.json(token);
        } else {
          res.status(400).json({
            status: "Error",
            message: "Invalid Password",
          });
        }
      } else {
        res.status(400).json({
          status: "Error",
          message: "User does not exist!",
        });
      }
    } else {
      res.status(400).json({
        status: "Error",
        message: "Invalid Email",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Server Error",
      message: err.message,
    });
  }
};

// Method : POST
// End Point : "api/v1/Auth/uploadProfilePicture";
// Description : Upload Profile Image

export const UploadProfileImage = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const findServiceProvider = await ServiceProviders.findOne({
      Email: user.Email,
    });
    console.log(findServiceProvider);
    const findCustomer = await Customer.findOne({ Email: user.Email });
    console.log(findCustomer);
    if (findCustomer) {
      image(req, res, (err) => {
        if (err) {
          console.log(err);
        } else {
          findCustomer.ProfileImage = req.file.filename;
        }
      });
      const uploadCustomerImage = await findCustomer.save();
      const updateCustomer = await Customer.findByIdAndUpdate(
        findCustomer.id,
        uploadCustomerImage,
        { new: true }
      );
      res.status(201).json({
        message: "Customer Profile Image Uploaded",
        data: {
          updateCustomer,
        },
      });
    } else if (findServiceProvider) {
      image(req, res, (err) => {
        if (err) {
          console.log(err);
        } else {
          findServiceProvider.ProfileImage = req.file.filename;
        }
      });
      const uploadServiceProviderImage = await findServiceProvider.save();
      const updateServiceProvider = await ServiceProviders.findByIdAndUpdate(
        findServiceProvider.id,
        uploadServiceProviderImage,
        { new: true }
      );
      res.status(201).json({
        message: "Service Providers Profile Image Uploaded",
        data: {
          updateServiceProvider,
        },
      });
    } else {
      res.status(404).json({
        message: "No user exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/Auth/getProfile";
// Description : Get User Details
export const getUserProfile = async (req, res) => {
  try {
    const User = req.user;
    console.log(User);
    const findServiceProvider = await ServiceProviders.findOne({
      Email: User.Email,
    });
    const findCustomer = await Customer.findOne({ Email: User.Email });
    if (findCustomer) {
      const user = findCustomer;
      res.status(201).json({
        message: `Account Details of ${user.Name}`,
        user,
      });
    } else if (findServiceProvider) {
      const user = findServiceProvider;
      res.status(201).json({
        message: `Account Details of ${user.Name}`,
        user,
      });
    } else {
      res.status(404).json({
        message: "No user exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/Auth/logout";
// Description : Logging Out User
export const LogoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json("User Logging Out");
};

// Method : PATCH
// End Point : "api/v1/Auth/resetpassword";
// Description : Reset Password
export const PasswordReset = async (req, res) => {
  try {
    const user = req.user;
    const { CurrentPassword, NewPassword, ConfirmPassword } = req.body;
    console.log(req.body);
    const result = await validatePassword(CurrentPassword, user.Password);
    console.log(result);
    const customer = await Customer.findOne({ Email: user.Email }).populate(
      "Email"
    );
    const serviceProvider = await ServiceProviders.findOne({
      Email: user.Email,
    }).populate("Email");
    if (result) {
      if (NewPassword === ConfirmPassword) {
        
        const salt = await GenerateSalt();
        const encryptedPassword = await GeneratePassword(NewPassword, salt);
        if (customer) {
          await Customer.findOneAndUpdate(
            { Email: user.Email },
            {
              Password: encryptedPassword,
            },
            {
              new: true,
            }
          );

        } else if (serviceProvider) {
          console.log("test");
            await ServiceProviders.findOneAndUpdate(
            { Email: user.Email },
            {
              Password: encryptedPassword,
            },
            {
              new: true,
            }
          );
        }
        res.status(201).json({
          status: "Success",
          message: `Password Reset Successfully`,
        });
      } else {
        res.status(400).json({
          status: "Error",
          message: "Confirm Password Doesn't Match!",
        });
      }
    } else {
      res.status(402).json({
        status: "Error",
        message: `Current Password is incorrect!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
const createOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};
let otp;
let Number;
export const sendOTP = async (req, res) => {
  try {
    const {ContactNumber } = req.body;
    if(ContactNumber.charAt(0) == "0"){
      Number = "94" + ContactNumber.slice(1);
    }
    else if(ContactNumber.charAt(0) == "9"){
      Number=ContactNumber;
    }
    console.log(Number);
    const customer = await Customer.findOne({ ContactNumber: Number }).populate("ContactNumber");
    const serviceProvider = await ServiceProviders.findOne({
      ContactNumber: ContactNumber,
    }).populate("ContactNumber");
    otp = createOTP();
    if (customer || serviceProvider) {
      var message = {
        source: "ShoutDEMO",
        destinations: [Number],
        content: {
          sms: `Your Resto Account Password Reset OTP is ${otp}`,
        },
        transports: ["sms"],
      };
      client.sendMessage(message, (error, result) => {
        if (error) {
          console.error("error ", error);
        } else {
          console.log("result ", result);
        }
      });
      res.status(200).json({
        status:"Success",
        message:"Successfully Send OTP"
      })
    } else {
      res.status(404).json({ message: `Invalid Contact Number` });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { OTP, Password, ConfirmPassword } = req.body;
    console.log(OTP);
    console.log(otp);
    const customer = await Customer.findOne({ ContactNumber: Number }).populate("ContactNumber");
    const serviceProvider = await ServiceProviders.findOne({
      ContactNumber: Number,
    }).populate("ContactNumber");
    const salt = await GenerateSalt();
    const encryptedPassword = await GeneratePassword(Password, salt);
    const confirmEncryptedPassword = await GeneratePassword(
      ConfirmPassword,
      salt
    );
    if (otp == OTP) {
      if (customer) {
        const updateCustomerPwd = await Customer.findByIdAndUpdate(
          customer.id,
          {
            Password: encryptedPassword,
            ConfirmPassword: confirmEncryptedPassword,
          },
          { new: true }
        );
        res.status(200).json({
          status: "Success",
          message: "Password Reset Successfully",
          data: {
            updateCustomerPwd,
          },
        });
      } else if (serviceProvider) {
        const updateServiceProviderPwd =
          await ServiceProviders.findByIdAndUpdate(
            customer.id,
            {
              Password: encryptedPassword,
              ConfirmPassword: confirmEncryptedPassword,
            },
            { new: true }
          );
        res.status(200).json({
          status: "Success",
          message: "Password Reset Successfully",
          data: {
            updateServiceProviderPwd,
          },
        });
      }
    } else {
      res.status(400).json({
        status: "Success",
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
