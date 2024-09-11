import Comments from "../models/comments.js"

export const addComment=async(req,res,next)=>{
    const {comment}=req.body
    try{
        const create=await Comments.create({userId:req.user.id,videoId:req.params.id,comment})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllComments=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await Comments.find({videoId:req.params.id}).populate("userId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const removeComment=async(req,res,next)=>{
    try{
        const comm=await Comments.findByIdAndDelete(req.params.id)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}