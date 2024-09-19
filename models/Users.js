import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        // required:true,
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
        default:"img"
    },
    bannerImg:{
        type:String,
    },
    channelInfo:{
        type:String,
    },
    followers:{
        type:Number,
        default:0,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

export default mongoose.model("Users",UserSchema)