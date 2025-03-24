import Shorts from "../models/Shorts.js"
import ShortsDislike from "../models/ShortsDislike.js"

export const addShortsDislike=async(req,res,next)=>{
    try{
        await Shorts.findByIdAndUpdate(req.params.id, {
            $inc: { dislikes: 1 }
        })
        const create=await ShortsDislike.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllShortsDislike=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await ShortsDislike.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const isShortsDislike=async(req,res,next)=>{
    try{
        const comm=await ShortsDislike.findOne({videoId: req.params.id, userId: req.user.id})
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
export const removeShortsDislike=async(req,res,next)=>{
    try{
        await Shorts.findByIdAndUpdate(req.params.id, {
            $inc: { dislikes: -1 }
        })
        const comm=await ShortsDislike.findOne({videoId:req.params.id})
        await ShortsDislike.findByIdAndDelete(comm._id)
        return res.status(200).json("Disliked removed")
    }
    catch(err){
        next(err)
    }
}