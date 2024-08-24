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
        default:"img"
    },
    followers:{
        type:Number,
        default:0,
    },
    followedUser:{
        type:[{type:"String",ref:"Users"}]
    },
    history:{
        type:[{type:"String",ref:["Video", "Shorts"]}]
    },
    liked:{
        type:[{type:"String",ref:["Video", "Shorts"]}]
    },
    disliked:{
        type:[{type:"String",ref:["Video","Shorts"]}]
    },
    saved:{
        type:[{type:"String",ref:["Video","Shorts"]}]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

export default mongoose.model("Users",UserSchema)