import { addError } from "../error.js";
import Videos from "../models/Videos.js"
import Users from "../models/Users.js"

export const createVideo=async(req,res,next)=>{
    try{
        const newVideo =new Videos({userId:req.user.id,...req.body})
        const savedVideo=await newVideo.save();
        return res.status(200).json(savedVideo);
    }
    catch(err){
        next(err)
    }
}

export const updateVideo=async(req,res,next)=>{
    try{
        const video =await Videos.findById(req.params.id)
        if(!video){
            return next(addError(404,"Video Not found !"))
        }
        if(video.userId==req.user.id){
            const updatedVideo=await Videos.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            return res.status(200).json(updatedVideo);
        }
        return res.status(200).json("You cannot Update other's videos");
    }
    catch(err){
        next(err)
    }
}
export const getVideo=async(req,res,next)=>{
    try{
        const videos = await Videos.findById(req.params.id).populate("userId");
        if(!videos){
            return next(addError(404,"Video Not found !"))
        }
        return res.status(200).json(videos);
    }
    catch(err){
        next(err)
    }
}

export const deleteVideo=async(req,res,next)=>{
    try{
        const video=await Videos.findById(req.params.id,
        )
        if(!video){
            return next(addError(404,"Video Not Present"))
        }
        if(video.userId===req.user.id){
            await Videos.findByIdAndDelete(req.params.id,)
        }
        return res.status(200).json("Videos is Removed")
    }
    catch(err){
        next(err)
    }
}

export const getAllVideos=async(req,res,next)=>{
    // console.log("ewfewaf")
    const {limit,skip}=req.query;
    try{
        const videos=await Videos.find().sort({ _id: -1 }).populate("userId").limit(limit).skip(skip)
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}
export const getRandomVideos=async(req,res,next)=>{
    let {limit,skip}=req.query;
    limit=limit-0
    try{
        const videos=await Videos.aggregate([{ $sample: { size: 10 } }])
        // const videos=await Videos.find().sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}

export const CurrentUserVideos=async(req,res,next)=>{
    let {limit,skip}=req.query;
    // limit=limit-0
    try{
        // const videos=await Shorts.aggregate([{ $sample: { size: limit } }])
        const videos=await Videos.find({userId:req.params.id}).sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}

export const addViews=async(req,res,next)=>{
    try{
        const videos=await Videos.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        return res.status(200).json("View is Increased")
    }
    catch(err){
        next(err)
    }
}
export const getAllCategory=async(req,res,next)=>{
    
    try{
        const videos=await Videos.find({category:req.params.id}).limit(10)
        
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}
export const getSearchVideo=async(req,res,next)=>{
    try{
        const videos=await Videos.find({"title" : {$regex : req.params.id,$options:"i"}}).populate('userId')
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}