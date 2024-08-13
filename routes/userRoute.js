import express from 'express';
import { getUser, updateUser, deleteUser, subscribe, unsubscribe, history, addHistory, like } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router=express.Router();

// Update a User
router.put('/update/:id',verifyToken,updateUser)
// delete a user
router.delete('/delete/:id',verifyToken,deleteUser)
// find or get a user
router.get('/get/:id',getUser)
// Subscribe a user
router.put('/subscribe/:id',verifyToken,subscribe)
// Unsubscribe a user
router.put('/unsubscribe/:id',verifyToken,unsubscribe)
// history
router.get('/history',verifyToken,history)
// Add history
router.put('/history/:id',verifyToken,addHistory)
// add liked video
// router.put('/liked/:id',verifyToken,likedVid)
// add liked video
router.get('/like',verifyToken,like)
// remove liked video
// router.put('/unliked/:id',verifyToken,unlikedVid)

export default router;