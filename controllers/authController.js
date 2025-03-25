import { addError } from "../error.js";
import User from "../models/Users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config()
import Otp from "../models/Otp.js";
import { set } from "mongoose";


export const signup = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log("signup");
        const checkUser = await User.findOne({ username: req.body.username })
        if (checkUser) {
            return next(addError(400, "Username Already Exist"))
        }
        const checkEmail = await User.findOne(email)
        if (checkEmail) {
            return next(addError(400, "Email Already Exist"))
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hash })
        // console.log(newUser)
        // await newUser.save();
        const user = await User.create(newUser)

        console.log("User signup Is Successful")

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        // console.log(jwtToken)
        const tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

        res.cookie("access_token", jwtToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            expires: tenYearsFromNow,
            // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
        }).status(200).json(others);
    }
    catch (err) {
        next(addError(500, 'Not able to create !'))
    }
}


export const login = async (req, res, next) => {
    try {
        console.log("Login");

        // console.log(user);

        const user = await User.findOne({ username: req.body.username })
        // console.log(user)
        if (!user) {
            return next(addError(404, "User Doesn't Exist"))
        }
        // console.log(req.body)

        //Password Check
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        // console.log(req.body.password,user.password)
        // console.log(isPasswordCorrect)

        if (!isPasswordCorrect) {
            return next(addError(400, "Wrong Password"))
            // return res.status(400).send("Wrong Password")
        }
        console.log("User signin Is Successful")

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        // console.log(jwtToken)
        const tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
        res.cookie("access_token", jwtToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            expires: tenYearsFromNow,
            // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
        }).status(200).json(others);

    }
    catch (err) {
        next(err);
    }
}
export const logout = async (req, res, next) => {
    try {
        return res.cookie('access_token', '', {
            expire: new Date(0), path: '/',
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: 'none',
        }).status(200).json('Logout');
    }
    catch (err) {
        next(err);
    }
}


export const googlelogin = async (req, res, next) => {
    try {
        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) {
            const user = checkEmail
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            // console.log(jwtToken)
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
            return res.cookie("access_token", jwtToken, {
                path: "/",
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                expires: tenYearsFromNow,
                // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
            }).status(200).json(others);
        }
        else {
            const newUser = new User({ ...req.body })
            const user = await User.create(newUser)
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            // console.log(jwtToken)
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
            return res.cookie("access_token", jwtToken, {
                path: "/",
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                expires: tenYearsFromNow,
                // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
            }).status(200).json(others);

        }

    }
    catch (err) {
        next(err);
    }
}

export const forgotPassword = async (req, res, next) => {
    const otp=Math.floor(Math.random() * 1000000)
    const resetPasswordEmail = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            padding-top: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header img {
            width: 150px;
            margin-bottom: 20px;
        }
        .otp-box {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 3px;
            text-align: center;
            margin: 10px auto;
            padding: 10px;
            width: 200px;
            border: 2px solid #ff0000;
            border-radius: 5px;
            color: #ff0000;
            background: #fff;
            user-select: all; /* Helps manual copy */
        }
        .otp-input {
            width: 200px;
            padding: 12px;
            font-size: 18px;
            text-align: center;
            border: 2px solid #ff0000;
            border-radius: 5px;
            font-weight: bold;
            color: #ff0000;
            background: #fff;
            pointer-events: none;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/dl5gqrtf0/image/upload/v1742894976/youtubelogo_1_fw11ut.png" alt="YouTube Clone Logo">
        </div>
        <h2>Reset Your Password</h2>
        <p>Use the OTP below to reset your password. This OTP is valid for 10 minutes:</p>

        <!-- OTP Input Field (for Auto-Detect & Copy) -->
        <input type="text" class="otp-input" value="${otp}" readonly autocomplete="one-time-code">

        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">
            <p>© 2025 YouTube Clone. All rights reserved.</p>
        </div>
    </div>

</body>
</html>
`

    try {
        const resend = new Resend(process.env.EMAIL);
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: req.body.email,
            subject: "Youtube-Clone Password-reset OTP",
            html: resetPasswordEmail,
        });
        const otpData=await Otp.findOne({email:req.body.email})
        if(otpData){
            await Otp.findOneAndUpdate({email:req.body.email},{$set:{otp:otp,expiresAt:new Date(Date.now() + 10 * 60 * 1000)}})
        }
        else{
            await Otp.create({ email: req.body.email, otp: otp })
        }
        return res.status(200).json("successful")
    }
    catch (err) {
        console.log(err)
    }
}