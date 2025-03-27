import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "bhudeobbbb@gmail.com",
        pass: "jn7jnAPss4f63QBp6D",
    },
});

// async..await is not allowed in global scope, must use a wrapper
