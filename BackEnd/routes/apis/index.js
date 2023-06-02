const router = require("express").Router();
const apiLogin = require("./login");
const apiAuth = require("./auth");

router.use("/login", apiLogin);
router.use("/auth", apiAuth);

module.exports = router;
