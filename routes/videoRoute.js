import express from 'express';
import { addViews, deleteVideo, getAllVideos, getVideo, updateVideo, getAllCategory, getSearchVideo, like, dislike, unlike, undislike, CurrentUserVideos, getRandomVideos } from '../controllers/videoController.js';
import { verifyToken } from '../verifyToken.js';
import { createVideo } from '../controllers/videoController.js';

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
router.put('/like/:id',verifyToken,like)
// dislike Video
router.put('/dislike/:id',verifyToken,dislike)
// unlike Video
router.put('/unlike/:id',verifyToken,unlike)
// undislike Video
router.put('/undislike/:id',verifyToken,undislike)
// current user Video
router.get('/allcurrentvideos/:id',CurrentUserVideos)
// random Video
router.get('/random/vid',getRandomVideos)

export default router;