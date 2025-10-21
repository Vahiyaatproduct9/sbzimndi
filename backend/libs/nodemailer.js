import { configDotenv } from "dotenv";
configDotenv({
  path: "../.env",
});
import nodemailer from "nodemailer";
const Mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kishordebnath123123@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export default Mail;
