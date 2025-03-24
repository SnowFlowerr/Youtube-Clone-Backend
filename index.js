import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js'
import videoRoutes from './routes/videoRoute.js'
import shortsRoutes from './routes/shortsRoute.js'
import authRoutes from './routes/auth.js'
import commentsRoute from './routes/commentsRoute.js'
import musicRoute from "./routes/music.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

const app=express();
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ['https://youtube-clone-snowflowerr.vercel.app','http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    }));

dotenv.config()
const connectApp=()=>{
    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("Database Connected")
    }).catch((error)=>{
        console.log(error);
        throw error;
    })
}


app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/videos',videoRoutes)
app.use('/api/shorts',shortsRoutes)
app.use('/api/comments',commentsRoute)
app.use('/api/music',musicRoute)

app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "Something is wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(8000,()=>{
    console.log("Server Connected at port",8000)
    connectApp()
})
