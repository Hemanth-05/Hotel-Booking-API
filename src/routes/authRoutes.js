import express from 'express';

import { signUpHandler, logInHandler } from '../controllers/authControllers.js';
import { validateUser } from '../middlewear/userValidation.js';

const router = express.Router();

router.post('/signup', validateUser, signUpHandler);
router.post('/login', validateUser, logInHandler);

export default router;