import mongoose from "mongoose";

const videosLikeSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoId:{
        type:String,
        ref:"Video",
        required:true,
    },
},{timestamps:true})

export default mongoose.model("videosLike",videosLikeSchema)