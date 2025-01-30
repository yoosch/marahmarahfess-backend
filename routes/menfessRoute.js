const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { postMessage, getMessages } = require("../controllers/menfessController");

// Middleware untuk set nama default
const setDefaultName = (req, res, next) => {
    if (!req.body.name || req.body.name.trim() === "") {
        req.body.name = "Anonim";
    }
    next();
};

// Route untuk mengambil semua pesan
router.get("/messages", getMessages);

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

module.exports = router;
