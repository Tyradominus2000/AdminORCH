const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");
const connection = require("../../database/index");

router.get("/", (req, res) => {
  const { tokenAdmin } = req.cookies;
  if (tokenAdmin) {
    try {
      const decodedToken = jsonwebtoken.verify(tokenAdmin, keyPub, {
        algorithms: "RS256",
      });
      const sql = `SELECT idUser, Useremail, Userimage, Userperm from users WHERE idUser = "${decodedToken.sub}"`;
      connection.query(sql, (err, result) => {
        const user = result[0];
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.send(JSON.stringify(null));
        }
      });
    } catch (error) {
      res.send(JSON.stringify(null));
    }
  } else {
    res.send(JSON.stringify(null));
  }
});

module.exports = router;
