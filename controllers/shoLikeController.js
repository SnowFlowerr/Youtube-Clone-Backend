import Shorts from "../models/Shorts.js"
import ShortsLiked from "../models/ShortsLiked.js"

export const addShortsLiked=async(req,res,next)=>{
    try{
        await Shorts.findByIdAndUpdate(req.params.id, {
            $inc: { likes: 1 }
        })
        const create=await ShortsLiked.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllShortsLiked=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await ShortsLiked.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const isShortsLiked=async(req,res,next)=>{
    try{
        const comm=await ShortsLiked.findOne({videoId: req.params.id, userId: req.user.id})
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
export const removeShortsLiked=async(req,res,next)=>{
    try{
        await Shorts.findByIdAndUpdate(req.params.id, {
            $inc: { likes: -1 }
        })
        const comm=await ShortsLiked.findOne({videoId:req.params.id})
        await ShortsLiked.findByIdAndDelete(comm._id)
        return res.status(200).json("Liked removed")
    }
    catch(err){
        next(err)
    }
}