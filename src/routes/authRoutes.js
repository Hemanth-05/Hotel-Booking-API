import express from 'express';

import { signUpHandler } from '../controllers/authControllers.js';
import { validateUser } from '../middlewear/userValidation.js';

const router = express.Router();

router.post('/signup', validateUser, signUpHandler);

export default router;