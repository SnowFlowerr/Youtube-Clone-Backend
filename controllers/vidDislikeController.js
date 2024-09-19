import VideoDislike from "../models/VideoDislike.js"
import Videos from "../models/Videos.js"

export const addVideoDislike=async(req,res,next)=>{
    try{
        await Videos.findByIdAndUpdate(req.params.id, {
            $inc: { dislikes: 1 }
        })
        const create=await VideoDislike.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllVideoDislike=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await VideoDislike.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const isVideoDislike=async(req,res,next)=>{
    try{
        const comm=await VideoDislike.findOne({videoId:req.params.id})
        if(comm){
            return res.status(200).json(true)
        }
        else{
            return res.status(200).json(false)
        }
    }
    catch(err){
        next(err)
    }
}
export const removeVideoDislike=async(req,res,next)=>{
    try{
        await Videos.findByIdAndUpdate(req.params.id, {
            $inc: { dislikes: -1 }
        })

        const comm=await VideoDislike.findOne({videoId:req.params.id})
        await VideoDislike.findByIdAndDelete(comm._id)
        return res.status(200).json("Disliked removed")
    }
    catch(err){
        next(err)
    }
}