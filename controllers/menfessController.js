const db = require("../config/db");


//Get all messages
const getMessages = (req, res) => {
    const query = "SELECT * FROM messages";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(results);
        }
    })
}

//Post a message
const postMessage = (req, res) => {
    const { name, receiver, message } = req.body;
    const finalName = name && name.trim() !== "" ? name : "Anonim";

    const query = "INSERT INTO messages (name, receiver, message) VALUES (?, ?, ?)";
    db.query(query, [finalName, receiver, message], (err, results) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).json({ id: results.insertId, name, receiver, message });
        }
    })
}

module.exports = { getMessages, postMessage };