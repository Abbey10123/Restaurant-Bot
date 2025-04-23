const mongoose = require("mongoose");
const shortid = require("shortid");

const orderSchema = new mongoose.Schema({
    _id: {
        type: String, default: shortid.generate 
    },
    sessionId: {
        type: String,
        required: true
      },
      itemName: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        default: "pending" 
      }
    
}, { timestamps: true });  

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;


