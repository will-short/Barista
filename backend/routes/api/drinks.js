const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Drink, Ingredient } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get(
  "/test-route",
  asyncHandler(async (req, res) => {
    let drinks = await Drink.findAll({
      include: Ingredient,
    });
    res.json(drinks);
  })
);
module.exports = router;
