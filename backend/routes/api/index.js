const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");
const drinksRouter = require("./drinks");
const checkinsRouter = require("./checkins");
const commentsRouter = require("./comments");
const locationsRouter = require("./locations");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/drinks", drinksRouter);
router.use("/checkins", checkinsRouter);
router.use("/comments", commentsRouter);
router.use("/locations", locationsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

// Restore session user

module.exports = router;
