import VideoLiked from "../models/VideoLiked.js"
import Videos from "../models/Videos.js"

export const addVideoLiked = async (req, res, next) => {
    try {
        await Videos.findByIdAndUpdate(req.params.id, {
            $inc: { likes: 1 }
        })
        const create = await VideoLiked.create({ userId: req.user.id, videoId: req.params.id })
        return res.status(200).json("Liked added")
    }
    catch (err) {
        next(err)
    }
}
export const getAllVideoLiked = async (req, res, next) => {
    const { limit, skip } = req.query
    try {
        const comm = await VideoLiked.find({userId:req.user.id}).populate("videoId").sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(comm)
    }
    catch (err) {
        next(err)
    }
}
export const isVideoLiked = async (req, res, next) => {
    try {
        const comm = await VideoLiked.findOne({ videoId: req.params.id, userId: req.user.id })
        if (comm) {
            return res.status(200).json(true)
        }
        else {
            return res.status(200).json(false)
        }
    }
    catch (err) {
        next(err)
    }
}
export const removeVideoLiked = async (req, res, next) => {
    try {
        await Videos.findByIdAndUpdate(req.params.id, {
            $inc: { likes: -1 }
        })
        const comm=await VideoLiked.findOne({videoId:req.params.id})
        await VideoLiked.findByIdAndDelete(comm._id)
        return res.status(200).json("Liked removed")
    }
    catch (err) {
        next(err)
    }
}