import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addComment, getAllComments, removeComment } from '../controllers/commentController.js';
const router=express.Router();

// for creating comments
router.post('/add/:id',verifyToken,addComment)
// get All comments
router.get('/:id',getAllComments)
// remove comments
router.delete('/:id',removeComment)


export default router;