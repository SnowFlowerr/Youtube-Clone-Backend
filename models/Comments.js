import mongoose from "mongoose";

const commentsSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"Users",
        required:true,
    },
    videoId:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
    },
    liked:{
        type:Number,
        default:0,
    },
    disliked:{
        type:Number,
        default:0,
    },
},{timestamps:true})

export default mongoose.model("Comments",commentsSchema)