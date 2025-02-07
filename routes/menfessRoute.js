const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { postMessage, getMessages, getMessage, postReply, getReplies } = require("../controllers/menfessController");

// Middleware untuk set nama default
const setDefaultName = (req, res, next) => {
    if (!req.body.name || req.body.name.trim() === "") {
        req.body.name = "Anonim";
    }
    next();
};

// Route untuk mengambil semua pesan
router.get("/messages", getMessages);

// Route untuk mengambil pesan berdasarkan ID
router.get("/messages/:messageId", getMessage);

router.get("/messages/:messageId/replies", getReplies);

// Route untuk mengirim pesan
router.post(
    "/messages",
    [
        setDefaultName,
        body("receiver").notEmpty().withMessage("Receiver is required"),
        body("message").notEmpty().withMessage("Message is required"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        postMessage(req, res);
    }
);

// Route untuk mengirim reply
router.post(
    "/messages/:messageId/reply",
    [
        body("reply").notEmpty().withMessage('Reply is required'),
    ],
    (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        postReply(req, res);
    }
);

module.exports = router;
