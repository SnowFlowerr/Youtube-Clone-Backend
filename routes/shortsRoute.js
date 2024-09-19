import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addViews, createShorts, CurrentUserShorts, deleteShorts, getAllCategory, getAllShorts, getOneShorts, getSearchShorts, getShorts, updateShorts } from '../controllers/shortController.js';

import { addShortsLiked, getAllShortsLiked, isShortsLiked, removeShortsLiked } from '../controllers/shoLikeController.js';
import { addShortsDislike, getAllShortsDislike, isShortsDislike, removeShortsDislike } from '../controllers/shoDislikeController.js';
import { addShortSaved, getAllShortSaved, isShortSaved, removeShortSaved } from '../controllers/shoSavedController.js';
import { addShortsHistory, getAllShortsHistory, removeShortsHistory } from '../controllers/shoHistoryController.js';

const router=express.Router();
// create video
router.post('/',verifyToken,createShorts)
// get Video
router.get('/:id',getShorts)
// update Video
router.put('/:id',verifyToken,updateShorts)
// delete Video
router.delete('/:id',verifyToken,deleteShorts)
// get All Videos
router.get('/',getAllShorts)
// get one shorts
router.get('/oneShort/:id',getOneShorts)
// increase Views
router.put('/view/:id',addViews)
// searched Video using category
router.get('/category/:id',getAllCategory)
// searched Video
router.get('/search/:id',getSearchShorts)


// like Video
router.put('/like/:id',verifyToken,addShortsLiked)
// is liked Video
router.get('/isliked/:id',verifyToken, isShortsLiked)
// unlike Video
router.delete('/unlike/:id',verifyToken,removeShortsLiked)
// get liked Video
router.get('/liked/get',verifyToken, getAllShortsLiked)

// dislike Video
router.put('/dislike/:id',verifyToken, addShortsDislike)
// is disliked Video
router.get('/isdisliked/:id',verifyToken, isShortsDislike)
// undislike Video
router.delete('/undislike/:id',verifyToken,removeShortsDislike)
// get unliked Video
router.get('/disliked/get',verifyToken, getAllShortsDislike)

// is saved Video
router.get('/issaved/:id',verifyToken, isShortSaved)
// save Video
router.put('/save/:id',verifyToken, addShortSaved)
// is saved Video
router.delete('/unsave/:id',verifyToken, removeShortSaved)
// get saved Video
router.get('/saved/get',verifyToken, getAllShortSaved)

// get history Video
router.get('/history/get',verifyToken, getAllShortsHistory)
// add history Video
router.put('/history/:id',verifyToken, addShortsHistory)
// remove history Video
router.delete('/history/:id',verifyToken,removeShortsHistory)


// current user Video
router.get('/allcurrentshorts/:id',CurrentUserShorts)

export default router;