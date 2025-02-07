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

const getReplies = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await menfessService.getReplies(messageId);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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

// Post a reply
const postReply = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { name, reply } = req.body;

        if (!reply || reply.trim() === "") {
            return res.status(400).json({ error: "Reply cannot be empty" });
        }

        const updatedMessage = await menfessService.sendReply(messageId, { name, reply });

        if (!updatedMessage) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.status(201).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getMessages, getReplies, postMessage, postReply };
