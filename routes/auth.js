import express from 'express';
import { login } from '../controllers/authController.js';
import { signup } from '../controllers/authController.js';

// for creating user
const router=express.Router();

// signup user
router.post('/signup',signup)
// signin user
router.post('/login',login)

// google auth
// router.post('/login',login)

export default router;