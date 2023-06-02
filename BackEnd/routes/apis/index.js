const router = require("express").Router();
const apiLogin = require("./login")

router.use("/login", apiLogin)

module.exports = router;
