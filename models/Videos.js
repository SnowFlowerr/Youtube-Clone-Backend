import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        ref:"Users",
        required:true,
    },
    imageUrl:{
        type:String,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        // required:true,
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
    // likedUser:{
    //     type:[String]
    // },
    // dislikedUser:{
    //     type:[String]
    // },
    tag:{
        type:[]
    },
    isBanned:{
            type:Boolean,
            default:false,
    },
    duration:{
            type:Number,
            default:0,
    },
},{timestamps:true})

export default mongoose.model("Video",videoSchema)