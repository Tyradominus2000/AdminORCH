const router = require("express").Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(email, " : ", password);

  res.send(JSON.stringify("OUI"));
});

module.exports = router;
