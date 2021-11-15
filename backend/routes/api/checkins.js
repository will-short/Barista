const express = require("express");
const asyncHandler = require("express-async-handler");
const { Checkin, Drink, User, Comment } = require("../../db/models");

const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const checkCheckin = [
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 0, max: 40 }),
  handleValidationErrors,
];
router.get(
  "/",

  asyncHandler(async (req, res) => {
    const checkins = await Checkin.all(Drink, User, Comment);
    res.json(checkins);
  })
);
// router.get(
//   "/user/:userid",
//   asyncHandler(async (req, res) => {
//     let checkins = await Checkin.userCheckins(userid);
//     res.json(checkins);
//   })
// );
// router.get(
//   "/drink/:drinkid",
//   asyncHandler(async (req, res) => {
//     let checkins = await Checkin.drinkCheckins(drinkid);
//     res.json(checkins);
//   })
// );
// router.get(
//   "/location/:locationid",
//   asyncHandler(async (req, res) => {
//     let checkins = await Checkin.drinkCheckins(locationid);
//     res.json(checkins);
//   })
// );
router.put(
  "/:checkinid",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.checkinid, 10);
    let { update } = req.body;
    let checkin = await Checkin.update(update, id);
    res.json(checkin);
  })
);
router.delete(
  "/:checkinid",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.checkinid, 10);
    const checkin = await Checkin.delete(id);
    res.json(checkin);
  })
);
router.post(
  "/",
  checkCheckin,
  asyncHandler(async (req, res) => {
    let { rating, description, drinkId, image, ownerId, location } = req.body;
    let checkin = await Checkin.makeNewCheckin(
      {
        rating: +rating,
        description,
        drink_id: drinkId,
        image,
        owner_id: ownerId,
        location,
      },
      Drink,
      User
    );

    res.json(checkin);
  })
);
module.exports = router;
