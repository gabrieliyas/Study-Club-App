import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
// import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/userroute.js";
import AuthRoute from "./routes/authroutes.js";
import db from "./config/database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async()=>{
//     await db.sync();
// })();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(UserRoute);
app.use(AuthRoute);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.status(404).send("Halaman tidak ditemukan");
});

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on port ${process.env.APP_PORT}...`);
});

// app.listen(process.env.APP_PORT, () => {
//   console.log("Server up and running...");
// });

// const db = require("./routes/db-config");
