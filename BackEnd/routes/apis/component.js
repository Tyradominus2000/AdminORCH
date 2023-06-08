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

router.post("/update", (req, res) => {
  const component = req.body;
  console.log(component);
  const sql =
    `UPDATE component_cpu SET ` +
    `CPUbrand="${component.brand}", ` +
    `CPUreleaseDate="${component.date}", ` +
    `CPUcodeName="${component.codename}", ` +
    `CPUprice="${component.price}", ` +
    `CPUSockets="${component.socket}", ` +
    `CPUlithograph="${component.litho}", ` +
    `CPUcoreCount="${component.core}", ` +
    `CPUthreadCount="${component.thread}", ` +
    `CPUcache="${component.cache}", ` +
    `CPUclockSpeed="${component.clock}", ` +
    `CPUmaxClockSpeed="${component.maxclock}", ` +
    `CPUbus="${component.bus}", ` +
    `CPUtypeMemory="${component.memory}", ` +
    `CPUmaxMemory="${component.maxMemory}", ` +
    `CPUmaxMemoryBandwidth="${component.bandwithMemory}", ` +
    `CPUsupportECCMemory="${component.ECCMemory}", ` +
    `CPUitgdGraphic="${component.itg}", ` +
    `CPUitgdGraphicFreq="${component.itgFreq}", ` +
    `CPUitgdGraphicMaxFreq="${component.itgMaxFreq}", ` +
    `CPUitgdGraphicSupport4K="${component.itg4k}", ` +
    `CPUmaxTDP="${component.tdp}", ` +
    `CPUmaxTemp="${component.maxTemp}" ` +
    `WHERE idComponent = "${component.idComponent}"`;

  try {
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      const sqlCompo = `UPDATE component SET ComponentName = "${component.name}" WHERE idComponent = "${component.idComponent}"`;
      connection.query(sqlCompo, (err, result) => {
        console.log(result);
        res.send(JSON.stringify("succes"));
      });
    });
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

router.post("/delete", (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM component_cpu WHERE idComponent = ${id}`;
  const sqlCompo = `DELETE FROM component WHERE idComponent = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    connection.query(sqlCompo, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify("ok"));
    });
  });
});

router.post("/create", (req, res) => {
  const component = req.body;
  const sqlCompo = `INSERT INTO component (ComponentType, ComponentName) VALUES ("CPU", "${component.name}")`;

  connection.query(sqlCompo, (err, result) => {
    if (err) throw err;
    const sql =
      `INSERT INTO component_cpu (CPUbrand, CPUreleaseDate, CPUcodeName, CPUprice, CPUSockets, CPUlithograph, CPUcoreCount, CPUthreadCount,` +
      `CPUcache, CPUclockSpeed, CPUmaxClockSpeed, CPUbus, CPUtypeMemory, CPUmaxMemory, CPUmaxMemoryBandwidth, CPUsupportECCMemory, CPUitgdGraphic , CPUitgdGraphicFreq, ` +
      `CPUitgdGraphicMaxFreq,CPUitgdGraphicSupport4K,CPUmaxTDP,CPUmaxTemp, idComponent) VALUES ` +
      `("${component.brand}", "${component.date}", "${component.codename}", "${component.price}","${component.socket}", ` +
      `"${component.litho}", "${component.core}", "${component.thread}", "${component.cache}", "${component.clock}", ` +
      `"${component.maxclock}", "${component.bus}", "${component.memory}", "${component.maxMemory}","${component.bandwithMemory}", "${component.ECCMemory}", ` +
      `"${component.itg}", "${component.itgFreq}", "${component.itgMaxFreq}", "${component.itg4k}", "${component.tdp}", "${component.maxTemp}", "${result.insertId}")`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify("Ok"));
    });
  });
});

module.exports = router;
