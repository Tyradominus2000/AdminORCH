const router = require("express").Router();
const apiRouter = require("./apis");

router.use("/api", apiRouter);

module.exports = router;
