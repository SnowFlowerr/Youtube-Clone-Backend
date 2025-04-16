import mongoose from "mongoose";

const musicLikeSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    musicId:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    title:{
        type:String,
    },
    img:{
        type:String,
    },
    channel:{
        type:String,
    },
},{timestamps:true})

export default mongoose.model("musicLike",musicLikeSchema)