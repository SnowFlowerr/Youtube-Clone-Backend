import VideoSaved from "../models/VideoSaved.js"

export const addVideoSaved=async(req,res,next)=>{
    try{
        const create=await VideoSaved.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllVideoSaved=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await VideoSaved.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const isVideoSaved=async(req,res,next)=>{
    try{
        const comm=await VideoSaved.findOne({videoId: req.params.id, userId: req.user.id})
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
export const removeVideoSaved=async(req,res,next)=>{
    try{
        const comm=await VideoSaved.findOne({videoId:req.params.id})
        await VideoSaved.findByIdAndDelete(comm._id)
        return res.status(200).json("Saved removed")
    }
    catch(err){
        next(err)
    }
}