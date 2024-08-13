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
// export const likedVid=async(req,res,next)=>{
//     try{
//         await Users.findByIdAndUpdate(req.user.id,{
//             $push:{liked:req.params.id}
//         });
//         res.status(200).json("added to liked Video")
//     }
//     catch(err){
//         next(err)
//     }
// }
// export const unlikedVid=async(req,res,next)=>{
//     try{
//         await Users.findByIdAndUpdate(req.user.id,{
//             $pull:{liked:req.params.id}
//         });
//         res.status(200).json("removed from liked Video")
//     }
//     catch(err){
//         next(err)
//     }
// }
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
        const history=await Users.findById(req.user.id).populate(["history","liked","disliked"]);
        const {password,...others}=history._doc;
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