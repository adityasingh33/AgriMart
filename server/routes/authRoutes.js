import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../Controllers/authControllers.js';
import protect from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;