const Message = require("../models/Message");
// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post a message
const postMessage = async (req, res) => {
    try {
        const { name, receiver, message } = req.body;
        const finalName = name && name.trim() !== "" ? name : "Anonim";

        const newMessage = new Message({ name: finalName, receiver, message });
        await newMessage.save();
        
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMessages, postMessage };
