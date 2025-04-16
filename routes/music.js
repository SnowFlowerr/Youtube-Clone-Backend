import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addMusicLiked, getAllMusicLiked, isMusicLiked, removeMusicLiked } from '../controllers/musicLikeController.js';

const router=express.Router();

// like Music
router.put('/addlike',verifyToken,addMusicLiked)
// is liked Music
router.get('/isliked/:id',verifyToken, isMusicLiked)
// unlike Music
router.delete('/unlike',verifyToken,removeMusicLiked)
// get liked Music
router.get('/liked/get',verifyToken, getAllMusicLiked)

export default router;