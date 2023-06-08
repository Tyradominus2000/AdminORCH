const router = require("express").Router();
const connection = require("../../database/index");

router.get("/", (req, res) => {
  const sqlCPU = `SELECT * FROM component c INNER JOIN component_cpu cpu ON cpu.idComponent = c.idComponent`;
  const sqlGPU = `SELECT * FROM component c INNER JOIN component_gpu gpu ON gpu.idComponent = c.idComponent`;
  const sqlMB = `SELECT * FROM component c INNER JOIN component_motherboard m ON m.idComponent = c.idComponent`;
  let resultat = [];
  connection.query(sqlCPU, (err, result) => {
    if (err) throw err;
    if (result[0]) {
      resultat = result;
    }
    connection.query(sqlGPU, (err, result) => {
      if (err) throw err;
      if (result[0]) {
        resultat.push(result);
      }
      connection.query(sqlMB, (err, result) => {
        if (err) throw err;
        if (result[0]) {
          resultat.push(result);
        }
        res.send(JSON.stringify(resultat));
      });
    });
  });
});

module.exports = router;
