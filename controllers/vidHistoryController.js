import VideoHIstory from "../models/VideoHIstory.js"

export const addVideoHIstory=async(req,res,next)=>{
    try{const his=await VideoHIstory.findOne({userId:req.user.id,videoId:req.params.id})
        if(his){
            await VideoHIstory.findByIdAndDelete(his._id)
        }
        const create=await VideoHIstory.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}

export const getAllVideoHIstory=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await VideoHIstory.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}

export const removeVideoHIstory=async(req,res,next)=>{
    try{
        const comm=await VideoHIstory.findOneAndDelete({videoId:req.params.id,userId:req.user.id})
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}