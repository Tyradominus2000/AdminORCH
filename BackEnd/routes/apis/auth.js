const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");
const connection = require("../../database/index");

router.get("/", (req, res) => {
  const { tokenAdmin } = req.cookies;
  console.log(tokenAdmin);
  if (tokenAdmin) {
    try {
      const decodedToken = jsonwebtoken.verify(tokenAdmin, keyPub, {
        algorithms: "RS256",
      });
      const sql = `SELECT idUser, Useremail, Userimage, UserPerm from users WHERE idUser = "${decodedToken.sub}"`;
      connection.query(sql, (err, result) => {
        const user = result[0];
        if (user && user.UserPerm === 3) {
          console.log("here ? if");
          res.send(JSON.stringify(user));
        } else {
          console.log("here ? else");
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
