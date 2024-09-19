import mongoose from "mongoose";

const subscribedSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    channelId:{
        type:String,
        ref:"Users",
        required:true,
    },
},{timestamps:true})

export default mongoose.model("subscribed",subscribedSchema)