import { addError } from "../error.js"
import Users from "../models/Users.js"

export const updateUser=async(req,res,next)=>{
    if(req.params.id==req.user.id){
        try{
            const updatedUser=await Users.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {
                new:true
            }
            )
            return res.status(200).json(updatedUser)
        }
        catch(err){
            next(err)
        }
    }
    else{
        return next(addError(400,"You Cannot Update Other Account"))
    }
}
export const deleteUser=async(req,res,next)=>{
    if(req.params.id==req.user.id){
        try{
            const users=await Users.findByIdAndDelete(req.params.id,
            )
            if(users){
                return res.status(200).json("User is Removed")
            }
            return res.status(200).json("User does not exist")
        }
        catch(err){
            next(err)
        }
    }
    else{
        return next(addError(400,"You Cannot Delete Other Account"))
    }
}
export const getUser=async(req,res,next)=>{
    try{
        const user=await Users.findById(req.params.id);
        const {password,history,shortsHistory,searchHistory,followedUser,liked,shortsLiked,disliked,shortsDisliked,saved,shortsSaved,...others}=user._doc;
        res.status(200).json({...others})
    }
    catch(err){
        next(err)
    }
}
export const getCurrentUser=async(req,res,next)=>{
    try{
        const user=await Users.findById(req.user.id);
        const {password,history,shortsHistory,searchHistory,followedUser,liked,shortsLiked,disliked,shortsDisliked,saved,shortsSaved,...others}=user._doc;
        res.status(200).json({...others})
    }
    catch(err){
        next(err)
    }
}
export const subscribe=async(req,res,next)=>{
    try{
        // console.log(req.params.id)
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{followedUser:req.params.id}
        });
        await Users.findByIdAndUpdate(req.params.id,{
            $inc:{followers:1}
        });
        res.status(200).json("Subscribed")
    }
    catch(err){
        next(err)
    }
}

export const unsubscribe=async(req,res,next)=>{
    try{
        // console.log(req.params.id)
        // await Users.findByIdAndUpdate(req.params.id,{
        //     $pull:{followedUser:req.user.id}
        // });
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{followedUser:req.params.id}
        });
        await Users.findByIdAndUpdate(req.params.id,{
            $inc:{followers:-1}
        });
        res.status(200).json("Unubscribed")
    }
    catch(err){
        next(err)
    }
}
export const getSubscribes=async(req,res,next)=>{
    try{
        const subs = await Users.findById(req.user.id).populate("followedUser");
        const {password,history,shortsHistory,searchHistory,liked,shortsLiked,disliked,shortsDisliked,saved,shortsSaved,...others}=subs._doc;
        res.status(200).json(others)
    }
    catch(err){
        next(err)
    }
}
export const isSubscribe=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            followedUser: req.params.id,
        });
        if(isSubs){
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
export const isLiked=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            liked: req.params.id,
        });
        if(isSubs){
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
export const isDisliked=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            disliked: req.params.id,
        });
        if(isSubs){
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
export const isSaved=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            saved: req.params.id,
        });
        if(isSubs){
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
export const isShortsLiked=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            shortsLiked: req.params.id,
        });
        if(isSubs){
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
export const isShortsDisliked=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            shortsDisliked: req.params.id,
        });
        if(isSubs){
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
export const isShortsSaved=async(req,res,next)=>{
    try{
        const isSubs=await Users.findOne({
            _id: req.user.id,
            shortsSaved: req.params.id,
        });
        if(isSubs){
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
export const like=async(req,res,next)=>{
    try{
        const likes=await Users.findById(req.user.id).populate("liked");
        const {password,history,...others}=likes._doc;
        res.status(200).json(others)
    }
    catch(err){
        next(err)
    }
}
export const history=async(req,res,next)=>{
    try{
        const history=await Users.findById(req.user.id).populate(["history","liked","disliked","saved"]);
        const {password,shortsHistory,shortsLiked,shortsDisliked,shortsSaved,...others}=history._doc;
        res.status(200).json(others)
    }
    catch(err){
        next(err)
    }
}
export const addHistory=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
        $pull:{history:req.params.id}
        });
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{history:req.params.id}
        });
        res.status(200).json("added to history")
    }
    catch(err){
        next(err)
    }
}
export const addToSave=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{saved:req.params.id}
        });
        res.status(200).json("added to saved")
    }
    catch(err){
        next(err)
    }
}
export const removeFromSave=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{saved:req.params.id}
        });
        res.status(200).json("removed from saved")
    }
    catch(err){
        next(err)
    }
}
export const likeShorts=async(req,res,next)=>{
    try{
        const likes=await Users.findById(req.user.id).populate("shortsLiked");
        const {password,history,...others}=likes._doc;
        res.status(200).json(others)
    }
    catch(err){
        next(err)
    }
}
export const historyShorts=async(req,res,next)=>{
    try{
        const shistory=await Users.findById(req.user.id).populate(["shortsHistory","shortsLiked","shortsDisliked","shortsSaved"]);
        const {password,liked,disliked,saved,history,followedUser,...others}=shistory._doc;
        res.status(200).json(others)
    }
    catch(err){
        next(err)
    }
}
export const addHistoryShorts=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
        $pull:{shortsHistory:req.params.id}
        });
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{shortsHistory:req.params.id}
        });
        res.status(200).json("added to history")
    }
    catch(err){
        next(err)
    }
}
export const addToSaveShorts=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{shortsSaved:req.params.id}
        });
        res.status(200).json("added to saved")
    }
    catch(err){
        next(err)
    }
}
export const removeFromSaveShorts=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{shortsSaved:req.params.id}
        });
        res.status(200).json("removed from saved")
    }
    catch(err){
        next(err)
    }
}
export const addToSearchHistory=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{searchHistory:req.params.id}
        });
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{searchHistory:req.params.id}
        });
        res.status(200).json("added to searchHistory")
    }
    catch(err){
        next(err)
    }
}
export const removeFromSearchHistory=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{searchHistory:req.params.id}
        });
        res.status(200).json("removed from searchHistory")
    }
    catch(err){
        next(err)
    }
}
export const getSearchHistory=async(req,res,next)=>{
    try{
        const {searchHistory} = await Users.findById(req.user.id);
        // const {password,history,shortsHistory,followedUser,liked,shortsLiked,disliked,shortsDisliked,saved,shortsSaved,...others}=search._doc;
        res.status(200).json(searchHistory)
    }
    catch(err){
        next(err)
    }
}