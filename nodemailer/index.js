require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    logger: true,
    debug: true,
  });
  


// Send email with the defined transport object
async function main() {
  try {
    const info = await transporter.sendMail({
      from: `<${process.env.EMAIL}>`, // sender address
      to: process.env.TO_EMAIL, // recipient email from .env
      subject: "Created an email sending feature using Nodemailer", // Subject line
      text: "Heya,\nThis is Anjali.\nThis is my mail which is sent using Nodemailer feature of Node.js.", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

main().catch(console.error);
