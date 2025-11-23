import express from "express";

import {
  createBooking,
  getUserBookings,
  getOwnerBookings,
  getAdminBookings,
  updateBooking,
  cancelBooking,
  deleteBooking
} from "../controllers/bookingController.js";

import { protect } from "../middleware/auth.js";
import { restrictTo } from "../middleware/authorize.js";

const router = express.Router();

// USER: create booking
router.post("/", protect, restrictTo("GUEST"), createBooking);

// USER: view own bookings
router.get("/", protect, restrictTo("GUEST"), getUserBookings);

// OWNER: view hotel bookings
router.get("/owner", protect, restrictTo("OWNER"), getOwnerBookings);

// ADMIN: view all bookings
router.get("/admin", protect, restrictTo("ADMIN"), getAdminBookings);

// Update booking
router.patch("/:id", protect, restrictTo("GUEST"), updateBooking);

// Cancel booking
router.patch(
  "/:id/cancel",
  protect,
  restrictTo("GUEST", "OWNER", "ADMIN"),
  cancelBooking
);

// DELETE booking (Admin only)
router.delete("/:id", protect, restrictTo("ADMIN"), deleteBooking);

export default router;
