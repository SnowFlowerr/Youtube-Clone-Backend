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
    thimbnail:{
        type:String,
    },
    title:{
        type:String,
    },
    channel:{
        type:String,
    },
},{timestamps:true})

export default mongoose.model("musicLike",musicLikeSchema)