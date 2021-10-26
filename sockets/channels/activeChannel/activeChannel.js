const ActiveModel = require("../../../model/activeModel");

let channel = (socket) => {
  socket.on("active", async (arg) => {
    switch (arg.op) {
      case "aloc":
        await ActiveModel.updateOne(
          { _id: arg.activeId },
          {
            userId: arg.userId,
            status: "indisp",
          }
        );
        break;
      case "dev":
        await ActiveModel.updateOne(
          { _id: arg.activeId },
          {
            userId: "",
            status: "disp",
          }
        );
        break;
      case "man":
        await ActiveModel.updateOne(
          { _id: arg.activeId },
          {
            userId: "",
            status: "man",
          }
        );
        break;
      case "afer":
        await ActiveModel.updateOne(
          { _id: arg.activeId },
          {
            userId: "",
            status: "afer",
          }
        );
        break;
      case "del":
        await ActiveModel.deleteOne({ _id: arg.id });
        break;
      case "new":
        await ActiveModel.create({...arg.data, status:'disp', userId:'', dataAfericao:''});
        console.log(arg.data)
        break;
      default:
        break;
    }

    socket.broadcast.emit("actives", await ActiveModel.find({}));
    socket.emit("actives", await ActiveModel.find({}));
    console.log("oi from active");
  });
  // socket.on("reserveActive", async (arg) => {
  //   let active = await ActiveModel.findById(arg.activeId);
  //   let actives = await ActiveModel.find({});

  //   console.log(active);

  //   socket.emit("actives", actives);
  //   console.log("oi from active");
  // });
};

module.exports = channel;
