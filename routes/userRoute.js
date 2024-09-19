import express from 'express';
import { verifyToken } from '../verifyToken.js';

import { getUser, updateUser, deleteUser, getCurrentUser} from '../controllers/userController.js';

import { addSubscribed, getAllSubscribed, isSubscribed, removeSubscribed } from '../controllers/subscribedController.js';

import { addSearchHistory, getAllSearchHistory, removeSearchHistory } from '../controllers/searchHisController.js';

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
router.put('/subscribe/:id',verifyToken, addSubscribed)
// Unsubscribe a user
router.delete('/unsubscribe/:id',verifyToken, removeSubscribed)
// is user subscribed
router.get('/issubscribe/:id',verifyToken, isSubscribed)
// get subscribed
router.get('/getsubscriber',verifyToken,getAllSubscribed)


// add to searchHistory
router.put('/addsearchHistory/:id',verifyToken,addSearchHistory)
// remove from searchHistory
router.delete('/removesearchHistory/:id',verifyToken,removeSearchHistory)
// get searchHistory
router.get('/getsearchHistory',verifyToken,getAllSearchHistory)




export default router;