import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateUser = [
    body('name')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

    body('email')
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

    body('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .bail()
    .isLength({min:8, max: 64})
    .withMessage("Password should be between 8 to 64 characters"),

    handleValidationErrors,
]