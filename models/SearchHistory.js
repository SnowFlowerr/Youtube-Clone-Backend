import mongoose from "mongoose";

const searchHisSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    searches:{
        type:String,
    }
},{timestamps:true})

export default mongoose.model("searchHistory",searchHisSchema)