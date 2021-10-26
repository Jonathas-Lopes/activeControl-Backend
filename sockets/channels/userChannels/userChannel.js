const UserModel = require("../../../model/UserModel");

let channel = (socket) => {
  socket.on("user", async (arg) => {
    switch (arg.op) {
      case "del":
        await UserModel.deleteOne({ _id: arg.id });
        break;
        case "new":
          await UserModel.create({...arg.data, admin:false, cart:''});
          console.log(arg.data)
          // await UserModel.deleteOne({ _id: arg.id });
          break;
      default:
        break;
    }

    socket.emit("users", await UserModel.find({}));
    socket.broadcast.emit("users", await UserModel.find({}));
  });
};

module.exports = channel;
