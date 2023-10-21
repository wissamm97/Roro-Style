const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  email:{
    type:String,
    require:true
  },
  message: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("message", message);
