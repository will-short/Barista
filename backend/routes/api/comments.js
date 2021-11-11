const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Comment } = require("../../db/models");

const router = express.Router();
router.get(
  "/:checkinid",
  asyncHandler(async (req, res) => {
    const id = +req.params.checkinid;
    const comments = await Comment.checkinComments(User, id);
    res.json(comments);
  })
);
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { content, checkinId, owner_id } = req.body;
    const comments = await Comment.makeNewComment({
      content,
      checkin_id: checkinId,
      owner_id,
    });
    res.json(comments);
  })
);
module.exports = router;
