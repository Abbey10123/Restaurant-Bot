const mongoose = require('mongoose');
const shortid = require('shortid')


const messageSchema = new mongoose.Schema({
        from: { type: String, enum: ['user', 'bot'], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      });

      const chatSchema = new mongoose.Schema({
        sessionId: { type: String, required: true, unique: true },
        messages: [messageSchema],
        currentOrder: {
          items: [{ name: String, quantity: Number, price: Number }],
          isConfirmed: { type: Boolean, default: false }
        },
        createdAt: { type: Date, default: Date.now },
      });      


const messageModel = mongoose.model("message", messageSchema)

const chatModel = mongoose.model("chat", chatSchema)

module.exports = {
    messageModel, 
    chatModel
}