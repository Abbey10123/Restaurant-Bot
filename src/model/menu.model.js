const mongoose = require("mongoose");
const shortid = require("shortid");

const menuSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate } ,
  name: String,
  price: Number
});

const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel