import express from 'express';

import { signUpHandler, logInHandler } from '../controllers/authControllers.js';
import { validateSignup, validateLogin } from '../middleware/userValidation.js';

const router = express.Router();

router.post('/signup', validateSignup, signUpHandler);
router.post('/login', validateLogin, logInHandler);

export default router;
