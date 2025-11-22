import { body, param, query } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

const roomFields = [
  body("roomNumber")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("roomNumber must be a positive integer"),
  body("capacity")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("capacity must be a positive integer"),
  body("pricePerNight")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("pricePerNight must be a non-negative number"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
];

export const validateCreateRoom = [
  param("hotelId")
    .isInt({ min: 1 })
    .withMessage("hotelId must be a positive integer"),
  body("roomNumber")
    .exists({ checkFalsy: true })
    .withMessage("roomNumber is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("roomNumber must be a positive integer"),
  body("capacity")
    .exists({ checkFalsy: true })
    .withMessage("capacity is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("capacity must be a positive integer"),
  body("pricePerNight")
    .exists({ checkFalsy: true })
    .withMessage("pricePerNight is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("pricePerNight must be a non-negative number"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
  handleValidationErrors,
];

export const validateUpdateRoom = [
  param("id").isInt({ min: 1 }).withMessage("room id must be a positive integer"),
  ...roomFields,
  (req, res, next) => {
    if (!Object.keys(req.body || {}).length) {
      return res.status(400).json({ error: "No data provided to update" });
    }
    next();
  },
  handleValidationErrors,
];

export const validateRoomIdParam = [
  param("id").isInt({ min: 1 }).withMessage("room id must be a positive integer"),
  handleValidationErrors,
];

export const validateListRooms = [
  query("capacity")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("capacity must be a positive integer"),
  query("maxPrice")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("maxPrice must be a non-negative number"),
  query("city")
    .optional({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("city must be at least 2 characters"),
  handleValidationErrors,
];
