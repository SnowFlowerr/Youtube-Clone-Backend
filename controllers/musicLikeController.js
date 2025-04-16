import Music from "../models/LikedMusic.js"

export const addMusicLiked = async (req, res, next) => {
    try {
        const create = await Music.create({ userId: req.user.id, ...req.body })
        return res.status(200).json("Liked added")
    }
    catch (err) {
        next(err)
    }
}
export const getAllMusicLiked = async (req, res, next) => {
    const { limit, skip } = req.query
    try {
        const comm = await Music.find({userId:req.user.id}).sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch (err) {
        next(err)
    }
}
export const isMusicLiked=async(req,res,next)=>{
    try{
        const comm=await Music.findOne({musicId: req.params.id, userId: req.user.id})
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
export const removeMusicLiked=async(req,res,next)=>{
    try{
        const comm=await Music.findOneAndDelete({musicId:req.params.id,userId:req.user.id})
        return res.status(200).json("Liked removed")
    }
    catch(err){
        next(err)
    }
}