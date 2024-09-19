import mongoose from "mongoose";

const videosSavedSchema=new mongoose.Schema({
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

export default mongoose.model("videosSaved",videosSavedSchema)