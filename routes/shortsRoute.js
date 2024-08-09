import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addViews, createShorts, deleteShorts, dislike, getAllCategory, getAllShorts, getSearchShorts, getShorts, like, undislike, unlike, updateShorts } from '../controllers/shortController.js';

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
// increase Views
router.put('/view/:id',addViews)
// searched Video using category
router.get('/category/:id',verifyToken,getAllCategory)
// searched Video
router.get('/search/:id',verifyToken,getSearchShorts)
// like Video
router.put('/like/:id',verifyToken,like)
// dislike Video
router.put('/dislike/:id',verifyToken,dislike)
// unlike Video
router.put('/unlike/:id',verifyToken,unlike)
// undislike Video
router.put('/undislike/:id',verifyToken,undislike)

export default router;