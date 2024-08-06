import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addViews, createShorts, deleteShorts, getAllCategory, getAllShorts, getSearchShorts, getShorts, updateShorts } from '../controllers/shortController.js';

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
router.put('/view/:id',verifyToken,addViews)
// searched Video using category
router.get('/category/:id',verifyToken,getAllCategory)
// searched Video
router.get('/search/:id',verifyToken,getSearchShorts)

export default router;