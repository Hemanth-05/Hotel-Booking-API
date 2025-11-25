import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

const nameField = () =>
  body('name')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long");

const emailField = (required = true) => {
  const chain = body('email');
  if (required) {
    chain.exists({ checkFalsy: true }).withMessage("Email is required").bail();
  } else {
    chain.optional({ checkFalsy: true });
  }
  return chain
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail();
};

const passwordField = (required = true) => {
  const chain = body('password');
  if (required) {
    chain.exists({ checkFalsy: true }).withMessage("Password is required").bail();
  } else {
    chain.optional({ checkFalsy: true });
  }
  return chain
    .isLength({ min: 8, max: 64 })
    .withMessage("Password should be between 8 to 64 characters");
};

export const validateUser = [
    nameField(),
    emailField(false),
    passwordField(true),
    handleValidationErrors,
]

export const validateSignup = [
    nameField(),
    emailField(true),
    passwordField(true),
    handleValidationErrors,
]

export const validateLogin = [
    emailField(true),
    passwordField(true),
    handleValidationErrors,
]

export const validateUpdateUser = [
    nameField(),
    emailField(false),
    passwordField(false),
    (req, res, next) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided to update" });
        }
        next();
    },

    handleValidationErrors,
]
