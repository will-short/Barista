const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res, next) => {
    console.log("????????????????????????????????", req.body);
    const exists = await User.exists(req.body.username, req.body.email);
    if (!exists.usernameExists && !exists.emailExists) {
      const user = await User.signup(req.body);

      await setTokenCookie(res, user);
      console.log(user);
      return res.json({
        user,
      });
    }
    const err = Error("Bad request.");
    err.errors = exists.usernameExists
      ? { username: "username already exists" }
      : { email: "email already exists" };
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  })
);

module.exports = router;
