const Message = require("../models/Message");
const menfessService = require("../services/menfessService");
// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await menfessService.getMessages(req.query);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post a message
const postMessage = async (req, res) => {
    try {
        const { name, receiver, message } = req.body;

        const newMessage = await menfessService.sendMessage({ name, receiver, message });
        
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMessages, postMessage };
