const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActiveSchema = new Schema({
  serialNumber: {
    type: String,
    required: false,
    unique: true,
  },
  model: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  littleText: {
    type: String,
    required: false,
  },
  dataAfericao: {
    type: String,
    required: false,
  },
  
});

const ActiveModel = mongoose.model("active", ActiveSchema);

module.exports = ActiveModel;
