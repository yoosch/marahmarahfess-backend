const { default: mongoose, get } = require("mongoose");
const Message = require("../models/Message");

const menfessService = {
    getMessages: async ({ limit = 50, start, end }) => {
        try {
            let query = {};
            // console.log(start, end, limit);
            
            if (start) {
                query.createdAt = { $gte: new Date(start) };
            }

            if (end) {
                query.createdAt = { ...query.createdAt, $lte: new Date(end) };
            }

            const messages = await Message.find(query).sort({ createdAt: -1 }).limit(parseInt(limit, 10));
            // console.log(messages);
            return messages;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getMessage: async (messageId) => {
        try {
            const message = await Message.findById(messageId);
            console.log(message);
            return message;
        } catch (error) {
            throw new Error(error);
        }
    },

    getReplies: async (messageId) => {
        try {
            const message = await Message.findById(messageId);
            return message;
        } catch (error) {
            throw new Error(error);
        }
    },

    sendMessage: async ({ name, receiver, message, type }) => {
        try {
            if (!message || message.trim() === "") {
                throw new Error("Message cannot be empty");
            }

            const finalName = name && name.trim() !== "" ? name : "Anonim";

            const newMessage = new Message({ name: finalName, receiver, message, type });
            await newMessage.save();

            console.log(newMessage);
            return newMessage;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    sendReply: async (messageId, {name, reply}) => {
        try {
            const finalName = name && name.trim() !== "" ? name : "Anonim";
            const updatedMessage = await Message.findByIdAndUpdate(
                new mongoose.Types.ObjectId(messageId),
                { $push: { replies: { name: finalName, reply, createdAt: new Date() } } },
                { new: true }
            );

            return updatedMessage;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = menfessService;
