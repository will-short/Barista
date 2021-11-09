const express = require("express");
const asyncHandler = require("express-async-handler");
const { Drink } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    let drinks = await Drink.all();
    res.json(drinks);
  })
);
module.exports = router;
