// src/routes/roomRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import { restrictTo } from "../middleware/authorize.js";
import {
  validateCreateRoom,
  validateUpdateRoom,
  validateRoomIdParam,
  validateListRooms,
} from "../middleware/roomValidation.js";
import {
  createRoomController,
  getRoomsController,
  getRoomByIdController,
  updateRoomController,
  deleteRoomController,
} from "../controllers/roomController.js";

const router = express.Router();

// CREATE room 
router.post(
  "/hotels/:hotelId/rooms",
  protect,
  restrictTo("OWNER", "ADMIN"),
  validateCreateRoom,
  createRoomController
);

// READ – list all published rooms with filters
router.get("/", validateListRooms, getRoomsController);

// READ – single room 
router.get("/:id", validateRoomIdParam, getRoomByIdController);

// UPDATE – /api/rooms/:id (Admin and Owner)
router.patch(
  "/:id",
  protect,
  restrictTo("OWNER", "ADMIN"),
  validateUpdateRoom,
  updateRoomController
);

// DELETE – /api/rooms/:id (Admin and Owner, block if future bookings)
router.delete(
  "/:id",
  protect,
  restrictTo("OWNER", "ADMIN"),
  validateRoomIdParam,
  deleteRoomController
);

export default router;
