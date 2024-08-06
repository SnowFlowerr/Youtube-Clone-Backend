import { addError } from "../error.js";
import User from "../models/Users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signup=async(req,res,next)=>{
    try{
        console.log("signup");
        const checkUser=await User.findOne({username:req.body.username})
        if(checkUser){
            return next(addError(400,"Username Already Exist"))
        }
        const checkEmail=await User.findOne({email:req.body.email})
        if(checkEmail){
            return next(addError(400,"Email Already Exist"))
        }
        const hash=bcrypt.hashSync(req.body.password,10);
        const newUser=new User({...req.body,password:hash})
        // console.log(newUser)
        // await newUser.save();
        await User.create(newUser)
        return res.status(200).send("User Signup SuccessFul")
    }
    catch(err){
        next(addError(500,'Not able to create !'))
    }
}


export const login=async(req,res,next)=>{
    try{
        console.log("Login");

        // console.log(user);
        
        const user=await User.findOne({username:req.body.username})
        // console.log(user)
        if(!user){
            return next(addError(404,"User Doesn't Exist"))
        }
        // console.log(req.body)

        //Password Check
        const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password)

        // console.log(req.body.password,user.password)
        // console.log(isPasswordCorrect)

        if(!isPasswordCorrect){
            return next(addError(400,"Wrong Password"))
            // return res.status(400).send("Wrong Password")
        }
        console.log("User signin Is Successful")

        const jwtToken=jwt.sign({id:user._id},process.env.JWT);
        const {password,...others}=user._doc;
        // console.log(jwtToken)
        res.cookie("access_token",jwtToken,{
            httpOnly:true
        }).status(200).json({...others,access_token: jwtToken });

    }
    catch(err){
        next(err);
    }
}