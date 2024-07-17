import express from 'express';
import { video } from '../controllers/videoController.js';

const router=express.Router();

router.get('/videos',video)

export default router;