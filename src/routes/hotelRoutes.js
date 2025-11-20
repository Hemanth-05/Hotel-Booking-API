import express from "express";
import * as hotelController from "../controllers/hotelController.js";
import { protect } from "../middleware/auth.js";
import { restrictTo, ownsHotel } from "../middleware/authorize.js";

const router = express.Router();

// CREATE HOTEL – Admin only
router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  hotelController.createHotel
);

// GET ALL HOTELS – Admin only
router.get(
  "/admin",
  protect,
  restrictTo("ADMIN"),
  hotelController.getAllHotels
);

// GET OWNER’S HOTELS – Owner only
router.get(
  "/owner",
  protect,
  restrictTo("OWNER"),
  hotelController.getOwnerHotels
);

// UPDATE HOTEL – Owner of hotel OR Admin
router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN", "OWNER"),
  ownsHotel,
  hotelController.updateHotel
);

// ASSIGN OWNER – Admin only
router.patch(
  "/:id/owner",
  protect,
  restrictTo("ADMIN"),
  hotelController.assignOwner
);

// DELETE HOTEL – Admin only
router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  hotelController.deleteHotel
);

export default router;
