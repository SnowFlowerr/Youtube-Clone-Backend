import { addError } from "../error.js"
import Users from "../models/Users.js"

export const updateUser=async(req,res,next)=>{
    if(req.parem.id==req.user.id){
        try{
            const user=await Users.findByIdAndUpdate(req.parem.id,{
                $set:res.body
            },
            {new:true}
            )
            return res.status(200).json(updateUser)
        }
        catch(err){
            next(err)
        }
    }
    else{
        return next(addError("You Cannot Update Other Account"))
    }
}
export const deleteUser=(req,res,next)=>{
    
}
export const getUser=(req,res,next)=>{
    
}