/**
 * @author Marcos Garcia (A01080115)
 * @version July/22/2020
 * @description app of pizza delivery service
 */

let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let app = express();

let indexRouter = require("./routes/index");
//Setting up MongoDb connection
const mongoose = require("mongoose");

// auth setup
const session = require("cookie-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

app.use(session({ keys: ["key1", "key2", "key3"] }));
app.use(flash());
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Configure passport-local to use user model for authentication
const user = require("./models/user");
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
//

mongoose.connect("mongodb://localhost/a01080115", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("Failed to connect to mongodb. Exiting...");
  process.exit(1);
});
db.once("open", function () {
  // we're connected!
  console.log("Connected to mongodb instance");
});

process.on("SIGINT", () => {
  console.log("Stopping the process..");
  mongoose.connection.close((err) => {
    console.log("Shutting down..");
    process.exit(0);
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
