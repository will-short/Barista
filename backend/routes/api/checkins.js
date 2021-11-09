const express = require("express");
const asyncHandler = require("express-async-handler");
const { Checkin, Drink } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const checkins = await Checkin.all(Drink);
    res.json(checkins);
  })
);
router.get(
  "/user/:userid",
  asyncHandler(async (req, res) => {
    let checkins = await Checkin.userCheckins(userid);
    res.json(checkins);
  })
);
router.get(
  "/drink/:drinkid",
  asyncHandler(async (req, res) => {
    let checkins = await Checkin.drinkCheckins(drinkid);
    res.json(checkins);
  })
);
router.get(
  "/location/:locationid",
  asyncHandler(async (req, res) => {
    let checkins = await Checkin.drinkCheckins(locationid);
    res.json(checkins);
  })
);
router.put(
  "/:checkinid",
  asyncHandler(async (req, res) => {
    let { update } = req.body;
    let checkin = await Checkin.update(checkinid, update);
    res.json(checkin);
  })
);
module.exports = router;
