import express from 'express';
import { getUser, updateUser, deleteUser, subscribe, unsubscribe, history, addHistory, like, addToSave, removeFromSave, getCurrentUser, isSubscribe, isLiked, isDisliked, isSaved, isShortsLiked, isShortsDisliked, isShortsSaved, historyShorts, addHistoryShorts, likeShorts, addToSaveShorts, removeFromSaveShorts, getSubscribes, addToSearchHistory, removeFromSearchHistory, getSearchHistory } from '../controllers/userController.js';
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
// get subscribed
router.get('/getsubscriber',verifyToken,getSubscribes)
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

// add to searchHistory
router.put('/addsearchHistory/:id',verifyToken,addToSearchHistory)
// remove from searchHistory
router.put('/removesearchHistory/:id',verifyToken,removeFromSearchHistory)
// get searchHistory
router.get('/getsearchHistory',verifyToken,getSearchHistory)


// is shorts liked
router.get('/islikedshorts/:id',verifyToken,isShortsLiked)
// is shorts disliked
router.get('/isdislikedshorts/:id',verifyToken,isShortsDisliked)
// is shorts saved
router.get('/issavedshorts/:id',verifyToken,isShortsSaved)
// history
router.get('/shortshistory',verifyToken,historyShorts)
// Add history
router.put('/shortshistory/:id',verifyToken,addHistoryShorts)
// add shorts video
router.get('/shortslike',verifyToken,likeShorts)
// add to saved
router.put('/addsaveshorts/:id',verifyToken,addToSaveShorts)
// remove from saved
router.put('/removesaveshorts/:id',verifyToken,removeFromSaveShorts)


export default router;