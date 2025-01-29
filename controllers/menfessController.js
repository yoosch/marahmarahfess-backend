const db = require("../config/db");
const menfessService = require("../services/menfessService");


//Get all messages
const getMessages = async (req, res) => {
    try {
        await console.log(req.query);
        const messages = await menfessService.getMessages(req.query);
        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Post a message
const postMessage = async (req, res) => {
    try {
        const { name, receiver, message } = req.body;

        const result = await menfessService.sendMessage({ name, receiver, message });

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getMessages, postMessage };