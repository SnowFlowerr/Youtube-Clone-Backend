import Subscribed from "../models/Subscribed.js"
import Users from "../models/Users.js"

export const addSubscribed=async(req,res,next)=>{
    try{
        const create=await Subscribed.create({userId:req.user.id,channelId:req.params.id})
        await Users.findByIdAndUpdate(req.params.id,{
            $inc:{followers: 1}
        })
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllSubscribed=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await Subscribed.find({userId:req.user.id}).populate("channelId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const isSubscribed=async(req,res,next)=>{
    try{
        const comm=await Subscribed.findOne({channelId:req.params.id})
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
export const removeSubscribed=async(req,res,next)=>{
    try{
        const comm=await Subscribed.findOne({channelId:req.params.id})
        await Subscribed.findByIdAndDelete(comm._id)
        await Users.findByIdAndUpdate(req.params.id,{
            $inc:{followers: -1}
        })
        res.status(200).json("Unsubscribed")
    }
    catch(err){
        next(err)
    }
}