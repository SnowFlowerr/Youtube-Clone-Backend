import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app=express();

dotenv.config()
const connectApp=()=>{
    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("Database Connected")
    }).catch((error)=>{
        console.log(error);
        throw error;
    })
}
connectApp()

app.listen(800,()=>{
    console.log("Server Connected at port",800)
})
