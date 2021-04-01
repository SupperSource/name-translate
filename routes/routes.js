const express = require("express");
const router = express.Router();
const db = require("crud-db");
const csvtojson = require("csvtojson");
const { translateText } = require("./../functions/translates");
const createCsvWriter = require("csv-writer").createArrayCsvWriter;

router.get("/", (req, res) => {
  res.render("index", { link: "none" });
});

router.post("/", async (req, res) => {
  const file = req.files.file;
  const filename = file.name;
  let dbno = db.get("num");
  const csvWriter = createCsvWriter({
    path: "xls/" + dbno + "-" + filename,
  });
  db.add("num", dbno + 1);

  file.mv("./xls/" + dbno + "-" + filename, (err) => {
    // console.log(err);
  });

  const convertedJSON = await csvtojson().fromFile(
    "./xls/" + dbno + "-" + filename
  );
  let hindiElemArray = [];

  for (let i = 0; i < convertedJSON.length; i++) {
    let translated = await translateText(convertedJSON[i].Name, "hin");
    hindiElemArray.push([convertedJSON[i].Name, translated[0]]);
  }
  
  csvWriter.writeRecords(hindiElemArray).then(() => {
    res.render("index", { link: "/static/" + dbno + "-" + filename });
  });
});

module.exports = router;
