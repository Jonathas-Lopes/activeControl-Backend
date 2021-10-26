const createError  = require("http-errors");
const express      = require("express");
const path         = require("path");
const cookieParser = require("cookie-parser");
const logger       = require("morgan");
const routes       = require("./routes/index");
const mongoose     = require("mongoose");
const passport     = require("passport");
const userModel    = require("./model/UserModel");
const cors         = require("cors");
                     require("./authStrategies/login");
                     require("./authStrategies/signup");
                     require("./authStrategies/jwt");
const app          = express();
const connection   = require('./env.json').mongo

mongoose.connect(`${connection.Server}:${connection.DB_PORT}/${connection.Database}`);
mongoose.connection.on("error", (error) => console.log(error));

app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: " *" }));
app.use("/",cors());
app.use("/teste",routes.testeRoute);
app.use("/users", cors(), routes.loginRoute);
app.use("/", routes.signupRoute);
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler

module.exports = app;
