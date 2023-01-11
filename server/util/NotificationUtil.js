import { Vonage } from "@vonage/server-sdk"
import nodemailer from "nodemailer";

const vonage = new Vonage({
  apiKey: "b543b851",
  apiSecret: "tXimqscJkdM379jQ"
})

export const sendRegistrationSms = async (to,from,text)=>{
    await vonage.sms.send({to, from, text})
        .then(resp => { 
            console.log('Message sent successfully'); 
            console.log(resp); 
        })
        .catch(err => { 
            console.log('There was an error sending the messages.'); 
            console.error(err); 
        });
}

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'resto6430@gmail.com',
        pass:'cicjmbbdilnbxdaf'
    }
});
