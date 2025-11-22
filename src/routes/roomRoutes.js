// src/routes/roomRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js"; // if you have this
import {
  createRoomController,
  getRoomsController,
  getRoomByIdController,
  updateRoomController,
  deleteRoomController,
} from "../controllers/roomController.js";

const router = express.Router();

// CREATE room 
router.post("/hotels/:hotelId/rooms", protect, requireRole("OWNER", "ADMIN"), createRoomController);

// READ – list all published rooms with filters
router.get("/rooms", getRoomsController);

// READ – single room 
router.get("/rooms/:id", getRoomByIdController);

// UPDATE – /api/rooms/:id (Admin and Owner)
router.patch("/rooms/:id", protect, requireRole("OWNER", "ADMIN"), updateRoomController);

// DELETE – /api/rooms/:id (Admin and Owner, block if future bookings)
router.delete("/rooms/:id", protect, requireRole("OWNER", "ADMIN"), deleteRoomController);

export default router;
