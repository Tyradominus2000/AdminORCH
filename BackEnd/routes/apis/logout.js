const router = require("express").Router();

router.delete("/", (req, res) => {
  console.log("logout");
  res.clearCookie("tokenAdmin");
  res.end();
});

module.exports = router;
