const axios = require("axios");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { Drink } = require("../../db/models");

const router = express.Router();
router.get(
  "/:data",
  asyncHandler(async (req, res) => {
    const data = req.params.data;
    const config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee&type=cafe&location=${data}&radius=6000&region=us&key=AIzaSyBynTKh6jKkL6pn5gHvhOIgFjHUXLvVfAA`,
      headers: {},
    };

    let locations = [];
    axios(config)
      .then(function (response) {
        locations = response.data.results;
        res.json(locations);
      })
      .catch(function (error) {
        console.log(error);
      });
  })
);

module.exports = router;