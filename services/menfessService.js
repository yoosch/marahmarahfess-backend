const Message = require("../models/Message");

const menfessService = {
    getMessages: async ({ limit = 50, start, end }) => {
        try {
            let query = {};
            
            if (start) {
                query.createdAt = { $gte: new Date(start) };
            }

            if (end) {
                query.createdAt = { ...query.createdAt, $lte: new Date(end) };
            }

            const messages = await Message.find(query).sort({ createdAt: -1 }).limit(parseInt(limit, 10));
            return messages;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    sendMessage: async ({ name, receiver, message }) => {
        try {
            if (!message || message.trim() === "") {
                throw new Error("Message cannot be empty");
            }

            const finalName = name && name.trim() !== "" ? name : "Anonim";

            const newMessage = new Message({ name: finalName, receiver, message });
            await newMessage.save();

            return newMessage;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = menfessService;
