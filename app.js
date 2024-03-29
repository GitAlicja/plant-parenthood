require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");
const passport = require("passport");

require("./config/passport");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);
const app = express();


// ADD SESSION SETTINGS HERE: This must be done BEFORE passport.session() call. Otherwise login will not work.
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: "doesn't matter in our case", // but it's required
    resave: false,
    saveUninitialized: false, // don't create cookie for non-logged-in user
    // MongoStore makes sure the user stays logged in also when the server restarts
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

app.use("/api", require("./routes/trefle-search-routes"));
app.use("/api", require("./routes/plant-routes"));
app.use("/api", require("./routes/reminder-routes"));
app.use("/api", require("./routes/user-routes"));
app.use('/api', require('./routes/file-upload-routes'));

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
