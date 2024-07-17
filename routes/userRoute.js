import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router=express.Router();

// Update a User
router.put('/:id',verifyToken,updateUser)
// delete a user
router.delete('/:id',deleteUser)
// find or get a user
router.get('find/:id',getUser)

export default router;