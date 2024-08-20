import express from 'express';
import { getUser, updateUser, deleteUser, subscribe, unsubscribe, history, addHistory, like, addToSave, removeFromSave, getCurrentUser, isSubscribe, isLiked, isDisliked, isSaved } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router=express.Router();

// Update a User
router.put('/update/:id',verifyToken,updateUser)
// delete a user
router.delete('/delete/:id',verifyToken,deleteUser)
// find or get a user
router.get('/get/:id',getUser)
// find or get current a user
router.get('/get',verifyToken,getCurrentUser)
// Subscribe a user
router.put('/subscribe/:id',verifyToken,subscribe)
// Unsubscribe a user
router.put('/unsubscribe/:id',verifyToken,unsubscribe)
// is user subscribed
router.get('/issubscribe/:id',verifyToken,isSubscribe)
// is video liked
router.get('/isliked/:id',verifyToken,isLiked)
// is video disliked
router.get('/isdisliked/:id',verifyToken,isDisliked)
// is video saved
router.get('/issaved/:id',verifyToken,isSaved)
// history
router.get('/history',verifyToken,history)
// Add history
router.put('/history/:id',verifyToken,addHistory)
// add liked video
router.get('/like',verifyToken,like)
// add to saved
router.put('/addsave/:id',verifyToken,addToSave)
// remove from saved
router.put('/removesave/:id',verifyToken,removeFromSave)

export default router;