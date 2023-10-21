const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("address", addressSchema);
