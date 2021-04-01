const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');
const upload = require('express-fileupload');

app.set("view engine", "ejs");
app.use(upload());
app.use('/', routes);
app.use("/static", express.static(__dirname + "/xls"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});