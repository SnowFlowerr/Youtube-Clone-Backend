import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createVideo } from '../controllers/videoController.js';

import { addViews, deleteVideo, getAllVideos, getVideo, updateVideo, getAllCategory, getSearchVideo, CurrentUserVideos, getRandomVideos } from '../controllers/videoController.js';

import { addVideoLiked, getAllVideoLiked, isVideoLiked, removeVideoLiked } from '../controllers/vidLikeController.js';
import { addVideoDislike, getAllVideoDislike, isVideoDislike, removeVideoDislike } from '../controllers/vidDislikeController.js';
import { addVideoSaved, getAllVideoSaved, isVideoSaved, removeVideoSaved } from '../controllers/vidSavedController.js';
import { addVideoHIstory, getAllVideoHIstory, removeVideoHIstory } from '../controllers/vidHistoryController.js';

const router=express.Router();
// create video
router.post('/',verifyToken,createVideo)
// get Video
router.get('/:id',getVideo)
// update Video
router.put('/:id',verifyToken,updateVideo)
// delete Video
router.delete('/:id',verifyToken,deleteVideo)
// get All Videos
router.get('/',getAllVideos)
// increase Views
router.put('/view/:id',addViews)
// searched Video using category
router.get('/category/:id',getAllCategory)
// searched Video
router.get('/search/:id',getSearchVideo)

// like Video
router.put('/like/:id',verifyToken,addVideoLiked)
// is liked Video
router.get('/isliked/:id',verifyToken, isVideoLiked)
// unlike Video
router.delete('/unlike/:id',verifyToken,removeVideoLiked)
// get liked Video
router.get('/liked/get',verifyToken, getAllVideoLiked)

// dislike Video
router.put('/dislike/:id',verifyToken, addVideoDislike)
// is disliked Video
router.get('/isdisliked/:id',verifyToken, isVideoDislike)
// undislike Video
router.delete('/undislike/:id',verifyToken,removeVideoDislike)
// get unliked Video
router.get('/disliked/get',verifyToken, getAllVideoDislike)

// is saved Video
router.get('/issaved/:id',verifyToken, isVideoSaved)
// save Video
router.put('/save/:id',verifyToken, addVideoSaved)
// is saved Video
router.delete('/unsave/:id',verifyToken, removeVideoSaved)
// get saved Video
router.get('/saved/get',verifyToken, getAllVideoSaved)

// get history Video
router.get('/history/get',verifyToken, getAllVideoHIstory)
// add history Video
router.put('/history/:id',verifyToken, addVideoHIstory)
// remove history Video
router.delete('/history/:id',verifyToken,removeVideoHIstory)

// current user Video
router.get('/allcurrentvideos/:id',CurrentUserVideos)
// random Video
router.get('/random/vid',getRandomVideos)

export default router;