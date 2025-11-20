import { body, param } from "express-validator";
import prisma from "../config/db.js";
import { handleValidationErrors } from "./handleValidationErrors.js";

const ensureUniqueName = () =>
  body("name").custom(async (value, { req }) => {
    if (!value) return true;
    const hotelId = Number(req.params?.id);
    const where = { name: value };
    if (Number.isInteger(hotelId) && hotelId > 0) {
      where.NOT = { id: hotelId };
    }
    const exists = await prisma.hotel.findFirst({ where });
    if (exists) {
      throw new Error("Hotel name must be unique");
    }
    return true;
  });

const commonFields = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("city")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage("City must be at least 2 characters long"),
  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
];

export const validateCreateHotel = [
  // name, city, address required on create
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  ensureUniqueName(),
  body("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required")
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("City must be at least 2 characters long"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Address is required")
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
  body("ownerId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ownerId must be a positive integer"),
  handleValidationErrors,
];

export const validateUpdateHotel = [
  param("id").isInt({ min: 1 }).withMessage("Hotel id must be a positive integer"),
  ...commonFields,
  ensureUniqueName(),
  body("ownerId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ownerId must be a positive integer"),
  // prevent empty body updates
  (req, res, next) => {
    if (!Object.keys(req.body || {}).length) {
      return res.status(400).json({ error: "No data provided to update" });
    }
    next();
  },
  handleValidationErrors,
];

export const validateAssignOwner = [
  param("id").isInt({ min: 1 }).withMessage("Hotel id must be a positive integer"),
  body("ownerId")
    .exists({ checkFalsy: true })
    .withMessage("ownerId is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("ownerId must be a positive integer"),
  handleValidationErrors,
];

export const validateHotelIdParam = [
  param("id").isInt({ min: 1 }).withMessage("Hotel id must be a positive integer"),
  handleValidationErrors,
];
