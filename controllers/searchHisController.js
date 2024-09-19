import SearchHistory from "../models/SearchHistory.js"

export const addSearchHistory=async(req,res,next)=>{
    try{
        const del=await SearchHistory.findOne({searches:req.params.id})
        if(del){
            await SearchHistory.findByIdAndDelete(del._id)
        }
        const create=await SearchHistory.create({userId:req.user.id,searches:req.params.id})
        return res.status(200).json(create)
    }
    catch(err){
        next(err)
    }
}
export const getAllSearchHistory=async(req,res,next)=>{
    const {limit,skip}=req.query
    try{
        const comm=await SearchHistory.find({userId:req.user.id}).sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}
export const removeSearchHistory=async(req,res,next)=>{
    try{
        const comm=await SearchHistory.findByIdAndDelete(req.params.id)
        return res.status(200).json(comm)
    }
    catch(err){
        next(err)
    }
}