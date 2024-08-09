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
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
export const subscribe=async(req,res,next)=>{
    try{
        // console.log(req.params.id)
        // await Users.findByIdAndUpdate(req.params.id,{
        //     $push:{followedUser:req.user.id}
        // });
        await Users.findByIdAndUpdate(req.params.id,{
            $inc:{followers:1},$push:{followedUser:req.user.id}
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
        await Users.findByIdAndUpdate(req.params.id,{
            $inc:{followers:-1},$pull:{followedUser:req.user.id}
        });
        res.status(200).json("Unubscribed")
    }
    catch(err){
        next(err)
    }
}
export const likedVid=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{liked:req.params.id}
        });
        res.status(200).json("added to liked Video")
    }
    catch(err){
        next(err)
    }
}
export const unlikedVid=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{liked:req.params.id}
        });
        res.status(200).json("removed from liked Video")
    }
    catch(err){
        next(err)
    }
}
export const history=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{history:req.params.id}
        });
        res.status(200).json("added to history")
    }
    catch(err){
        next(err)
    }
}