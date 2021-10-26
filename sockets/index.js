const passport = require("passport");
const active = require("./channels/activeChannel/activeChannel");
const users = require("./channels/userChannels/userChannel");
require("../authStrategies/jwt");

let socket = (io) => {
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);

  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.authenticate("jwt", { session: false })));
  io.on("connection", function (socket) {
    active(socket);

    users(socket);
    console.log("A user connected");

    socket.on("disconnect", function () {
      console.log("A user disconnected");
    });
  });
  //active(io);
};
module.exports = socket;
