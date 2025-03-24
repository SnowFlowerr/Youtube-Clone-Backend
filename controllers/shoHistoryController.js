import ShortsHistory from "../models/ShortsHistory.js"

export const addShortsHistory=async(req,res,next)=>{
    try{const his=await ShortsHistory.findOne({userId:req.user.id,videoId:req.params.id})
        if(his){
        await ShortsHistory.findByIdAndDelete(his._id)
        }
        const create=await ShortsHistory.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllShortsHistory=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await ShortsHistory.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const removeShortsHistory=async(req,res,next)=>{
    try{
        const comm=await ShortsHistory.findOneAndDelete({videoId:req.params.id,userId:req.user.id})
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}