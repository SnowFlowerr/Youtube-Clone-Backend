import mongoose from "mongoose";

const shortsDislikeSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoId:{
        type:String,
        ref:"Shorts",
        required:true,
    },
},{timestamps:true})

export default mongoose.model("shortsDislike",shortsDislikeSchema)