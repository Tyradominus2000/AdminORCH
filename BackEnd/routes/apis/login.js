const router = require("express").Router();
const connection = require("../../database");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE Useremail="${email}"`;

  connection.query(sql, (err, result) => {
    try {
      if (result[0]) {
        const idBack = result[0].idUser;
        const passwordBack = result[0].Userpassword;
        console.log(passwordBack);
        if (bcrypt.compareSync(password, passwordBack)) {
          const token = jsonwebtoken.sign({}, key, {
            subject: idBack.toString(),
            expiresIn: 3600 * 24 * 30 * 6,
            algorithm: "RS256",
          });
          console.log("token : ", token);
          res.cookie("tokenAdmin", token);
          res.send(JSON.stringify(result[0]));
        } else {
          res
            .status(400)
            .send(JSON.stringify("Email et/ou mot de passe incorrect"));
        }
      } else {
        res
          .status(400)
          .send(JSON.stringify("Email et/ou mot de passe incorrect"));
      }
    } catch (error) {
      res
        .status(400)
        .send(JSON.stringify("Email et/ou mot de passe incorrect"));
    }
  });
});

module.exports = router;
