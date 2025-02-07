const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: { type: String, default: "Anonim" },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  replies: [
    {
      name : { type: String, default: "Anonim" },
      reply: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
