import express from 'express';
import { getUser, updateUser, deleteUser, subscribe, unsubscribe, history, likedVid, unlikedVid } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router=express.Router();

// Update a User
router.put('/:id',verifyToken,updateUser)
// delete a user
router.delete('/:id',verifyToken,deleteUser)
// find or get a user
router.get('/:id',getUser)
// Subscribe a user
router.put('/subscribe/:id',verifyToken,subscribe)
// Unsubscribe a user
router.put('/unsubscribe/:id',verifyToken,unsubscribe)
// history
router.put('/history/:id',verifyToken,history)
// add liked video
router.put('/liked/:id',verifyToken,likedVid)
// remove liked video
router.put('/unliked/:id',verifyToken,unlikedVid)

export default router;