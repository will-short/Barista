const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Comment, Drink } = require("../../db/models");

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
    const comment = await Comment.makeNewComment(
      {
        content,
        checkin_id: checkinId,
        owner_id,
      },
      User
    );
    res.json(comment);
  })
);
router.put(
  "/:commentid",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.commentid, 10);
    let { content } = req.body;
    let comment = await Comment.update(content, id);
    res.json(comment);
  })
);
router.delete(
  "/:commentid",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.commentid, 10);
    const comment = await Comment.delete(id);
    res.json(comment);
  })
);
module.exports = router;
