import express from 'express';
import { addViews, createVideo, deleteVideo, getAllVideos, getVideo, updateVideo, getAllCategory, getSearchVideo } from '../controllers/videoController.js';
import { verifyToken } from '../verifyToken.js';

const router=express.Router();
// create video
router.post('/',verifyToken,createVideo)
// get Video
router.get('/:id',verifyToken,getVideo)
// update Video
router.put('/:id',verifyToken,updateVideo)
// delete Video
router.delete('/:id',verifyToken,deleteVideo)
// get All Videos
router.get('/',getAllVideos)
// increase Views
router.put('/view/:id',verifyToken,addViews)
// searched Video using category
router.get('/category/:id',verifyToken,getAllCategory)
// searched Video
router.get('/search/:id',verifyToken,getSearchVideo)

export default router;