require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("./models/admin");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const drugRouter = require("./routes/drugs");
const adminRouter = require("./routes/admin");

dbConnect();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.CORS_ORIGIN_URL,
    credentials: true,
  })
);

const sessionConfig = {
  secret: process.env.APP_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
    secure: process.env.NODE_ENV === "development" ? false : true,
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cookieParser(process.env.CORS_ORIGIN_URL));

// Authentication

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Routes
app.use("/admin", adminRouter);
app.use("/drugs", drugRouter);

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

// Remaining catch all express methods
app.get("*", (req, res) => {
  res.status(404).json({ message: "sorry we can't find it" });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
