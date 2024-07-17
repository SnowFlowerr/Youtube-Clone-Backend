import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    likes:{
        type:Number,
        default:0,
    },
    dislikes:{
        type:Number,
        default:0,
    },
    tag:{
        type:[]
    },
    isBanned:{
            type:Boolean,
            default:false,
    },
    duration:{
            type:String,
            default:0,
    },
},{timestamps:true})

export default mongoose.model("V        ideo",videoSchema)