const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Drink, Ingredient } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    let drinks = await Drink.all();
    res.json(drinks);
  })
);
module.exports = router;
