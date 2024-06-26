import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

const app = express();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});

// const express = require("express");
// const path = require("path");
// const db = require("./routes/db-config");
// const cookie = require("cookie-parser");
// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use("/js", express.static(path.join(__dirname + "/public/js")));
// app.use("/css", express.static(path.join(__dirname + "/public/css")));
// app.use(express.static(path.join(__dirname, 'public')));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(cookie());
// app.use(express.json());

// db.connect ((err) => {
//     if (err) throw err;
//     console.log("database connected");
// })

// app.use("/", require("./routes/pages"));
// app.use("/api", require("./controllers/auth"));