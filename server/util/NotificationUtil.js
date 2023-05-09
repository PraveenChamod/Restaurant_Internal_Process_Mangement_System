import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false, // Disable certificate validation
  },
  service: "gmail",
  auth: {
    user: "resto6430@gmail.com",
    pass: "cicjmbbdilnbxdaf",
  },
});
