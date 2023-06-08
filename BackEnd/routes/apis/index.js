const router = require("express").Router();
const apiLogin = require("./login");
const apiAuth = require("./auth");
const apiLogout = require("./logout");
const apiCompo = require("./component");

router.use("/login", apiLogin);
router.use("/auth", apiAuth);
router.use("/logout", apiLogout);
router.use("/components", apiCompo);

module.exports = router;
