import express from 'express';
<<<<<<< HEAD
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
=======

import { signUpHandler, logInHandler } from '../controllers/authControllers.js';
import { validateUser } from '../middlewear/userValidation.js';

const router = express.Router();

router.post('/signup', validateUser, signUpHandler);
router.post('/login', validateUser, logInHandler);
>>>>>>> ee2d7e554d5f0fb70655c9f12260a474cff7ecc3

export default router;