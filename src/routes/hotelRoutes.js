import express from "express";
import {createHotel, getAllHotels, getOwnerHotels, updateHotel, assignOwner, deleteHotel } from "../controllers/hotelController.js"
import { protect } from "../middleware/auth.js";
import { restrictTo, ownsHotel } from "../middleware/authorize.js";
import {
  validateCreateHotel,
  validateUpdateHotel,
  validateAssignOwner,
  validateHotelIdParam,
} from "../middleware/hotelValidation.js";

const router = express.Router();

// CREATE HOTEL – Admin only
router.post("/", protect, restrictTo("ADMIN"), validateCreateHotel, createHotel);

// GET ALL HOTELS – Admin only
router.get("/admin/hotels", protect, restrictTo("ADMIN"), getAllHotels);

// GET OWNER’S HOTELS – Owner only
router.get("/owner/hotels", protect, restrictTo("OWNER"), getOwnerHotels);

// UPDATE HOTEL – Owner of hotel OR Admin
router.patch("/:id",protect, restrictTo("ADMIN", "OWNER"), validateUpdateHotel, ownsHotel, updateHotel);

// ASSIGN OWNER – Admin only
router.patch("/:id/owner", protect, restrictTo("ADMIN"), validateAssignOwner, assignOwner);

// DELETE HOTEL – Admin only
router.delete("/:id", protect, restrictTo("ADMIN"), validateHotelIdParam, deleteHotel);

export default router;
