import ShortSaved from "../models/ShortSaved.js"

export const addShortSaved=async(req,res,next)=>{
    try{
        const create=await ShortSaved.create({userId:req.user.id,videoId:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllShortSaved=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await ShortSaved.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const isShortSaved=async(req,res,next)=>{
    try{
        const comm=await ShortSaved.findOne({videoId: req.params.id, userId: req.user.id})
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
export const removeShortSaved=async(req,res,next)=>{
    try{
        const comm=await ShortSaved.findOne({videoId:req.params.id})
        await ShortSaved.findByIdAndDelete(comm._id)
        return res.status(200).json("Saved removed")
    }
    catch(err){
        next(err)
    }
}