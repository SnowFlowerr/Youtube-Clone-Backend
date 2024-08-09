import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    img:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDCrr_w4eRQBV36vW3owNqK3Hsesq6lNpSsA&s"
    },
    followers:{
        type:Number,
        default:0,
    },
    followedUser:{
        type:[String]
    },
    history:{
        type:[String]
    },
    liked:{
        type:[String]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

export default mongoose.model("Users",UserSchema)