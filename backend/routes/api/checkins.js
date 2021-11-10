const express = require("express");
const asyncHandler = require("express-async-handler");
const { Checkin, Drink, User } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const checkins = await Checkin.all(Drink, User);
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
router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    let { rating, description, drinkId, image, ownerId } = req.body;
    let checkin = await Checkin.makeNewCheckin({
      rating: +rating,
      description,
      drink_id: drinkId,
      image,
      owner_id: ownerId,
    });
    console.log(checkin);

    res.json(checkin);
  })
);
module.exports = router;
