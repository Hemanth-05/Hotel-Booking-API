import express from 'express';
import { protect } from '../middleware/auth.js';
import { restrictTo } from '../middleware/authorize.js';
import { validateUpdateUser } from '../middleware/userValidation.js';
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUsersHandler,
  getHotelGuestsHandler
} from '../controllers/userController.js';

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.patch('/me', validateUpdateUser, updateMe);
router.delete('/me', deleteMe);

router.get('/admin/users', restrictTo('ADMIN'), getAllUsersHandler);
router.get('/owner/hotels/:hotelId/guests', restrictTo('OWNER'), getHotelGuestsHandler);

export default router;
