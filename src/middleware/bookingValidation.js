import { body, param, query } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

const requiredDateFields = [
  body("startDate")
    .exists({ checkFalsy: true })
    .withMessage("startDate is required")
    .bail()
    .isISO8601()
    .withMessage("startDate must be a valid ISO date"),
  body("endDate")
    .exists({ checkFalsy: true })
    .withMessage("endDate is required")
    .bail()
    .isISO8601()
    .withMessage("endDate must be a valid ISO date"),
  body("endDate").custom((value, { req }) => {
    const start = new Date(req.body.startDate);
    const end = new Date(value);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return true;
    if (end <= start) {
      throw new Error("endDate must be after startDate");
    }
    return true;
  }),
];

const optionalDateFields = [
  body("startDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("startDate must be a valid ISO date"),
  body("endDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("endDate must be a valid ISO date"),
  body("endDate").custom((value, { req }) => {
    if (!value || !req.body.startDate) return true;
    const start = new Date(req.body.startDate);
    const end = new Date(value);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return true;
    if (end <= start) {
      throw new Error("endDate must be after startDate");
    }
    return true;
  }),
];

export const validateCreateBooking = [
  body("roomId")
    .exists({ checkFalsy: true })
    .withMessage("roomId is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("roomId must be a positive integer"),
  ...requiredDateFields,
  body("guests")
    .exists({ checkFalsy: true })
    .withMessage("guests is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("guests must be at least 1"),
  handleValidationErrors,
];

export const validateUpdateBooking = [
  param("id").isInt({ min: 1 }).withMessage("booking id must be a positive integer"),
  body("roomId")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("roomId must be a positive integer"),
  ...optionalDateFields,
  body("guests")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("guests must be at least 1"),
  body("status")
    .optional({ checkFalsy: true })
    .isIn(["CONFIRMED", "CANCELLED"])
    .withMessage("status must be CONFIRMED or CANCELLED"),
  (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No data provided to update" });
    }
    next();
  },
  handleValidationErrors,
];

export const validateBookingIdParam = [
  param("id").isInt({ min: 1 }).withMessage("booking id must be a positive integer"),
  handleValidationErrors,
];

export const validateOwnerBookingsQuery = [
  query("hotelId")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("hotelId must be a positive integer"),
  handleValidationErrors,
];
