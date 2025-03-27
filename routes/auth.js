import express from 'express';
import { forgotPassword, googlelogin, login, logout, matchOtp, signup } from '../controllers/authController.js';

// for creating user
const router=express.Router();

// signup user
router.post('/signup',signup)
// signin user
router.post('/login',login)
// google signin
router.post('/googlelogin',googlelogin)
// Logout
router.post('/logout',logout)
// Password Reset
router.post('/forget',forgotPassword)
// Match password
router.post('/match',matchOtp)

export default router;