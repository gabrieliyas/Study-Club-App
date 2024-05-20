const express = require("express");
const path = require("path");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 5000;

app.use("/js", express.static(path.join(__dirname + "./public/js")));
app.use("/css", express.static(path.join(__dirname + "./public/css")));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookie());
app.use(express.json());

db.connect ((err) => {
    if (err) throw err;
    // console.log("database connected");
})

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));

app.listen(PORT);