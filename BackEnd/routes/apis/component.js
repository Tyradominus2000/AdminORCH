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
  const sql = `UPDATE component_cpu SET ` 
  +`CPUbrand="${component.brand}", `
  +`CPUreleaseDate="${component.date}", `
  +`CPUcodeName="${component.codename}", `
  +`CPUprice="${component.price}", ` 
  +`CPUSockets="${component.socket}", ` 
  +`CPUlithograph="${component.litho}", ` 
  +`CPUcoreCount="${component.core}", ` 
  +`CPUthreadCount="${component.thread}", ` 
  +`CPUcache="${component.cache}", ` 
  +`CPUclockSpeed="${component.clock}", `
  +`CPUmaxClockSpeed="${component.maxclock}", ` 
  +`CPUbus="${component.bus}", ` 
  +`CPUtypeMemory="${component.memory}", ` 
  +`CPUmaxMemory="${component.maxMemory}", ` 
  +`CPUmaxMemoryBandwidth="${component.bandwithMemory}", ` 
  +`CPUsupportECCMemory="${component.ECCMemory}", ` 
  +`CPUitgdGraphic="${component.itg}", ` 
  +`CPUitgdGraphicFreq="${component.itgFreq}", ` 
  +`CPUitgdGraphicMaxFreq="${component.itgMaxFreq}", ` 
  +`CPUitgdGraphicSupport4K="${component.itg4k}", ` 
  +`CPUmaxTDP="${component.tdp}", `
  +`CPUmaxTemp="${component.maxTemp}" `
  +`WHERE idComponent = "${component.idComponent}"`;

  try {
    connection.query(sql, (err, result) => {
      if(err) throw err
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

module.exports = router;
