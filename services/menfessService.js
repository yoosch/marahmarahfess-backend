const db = require("../config/db");

const menfessService = {

    getMessages: async ({ limit = 50, start, end }) => {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM messages";
            let conditions = [];
            let values = [];

            if (start) {
                conditions.push("created_at >= ?");
                values.push(start);
            }

            if (end) {
                conditions.push("created_at <= ?");
                values.push(end);
            }

            if (conditions.length > 0) {
                query += " WHERE " + conditions.join(" AND ");
            }

            query += " ORDER BY created_at DESC";

            query += " LIMIT ?";
            values.push(parseInt(limit, 10));

            console.log(query, values);

            db.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    sendMessage: async ({ name, receiver, message }) => {
        return new Promise((resolve, reject) => {
            if (!message || message.trim() === "") {
                return reject(new Error("Message cannot be empty"));
            }

            const finalName = name && name.trim() !== "" ? name : "Anonim";

            const query = "INSERT INTO messages (name, receiver, message, created_at) VALUES (?, ?, ?, NOW())";
            db.query(query, [finalName, receiver, message], (err, result) => {
                if (err) reject(err); 
                else resolve({ id: result.insertId, name: finalName, receiver, message }); 
            });
        });
    }
};

module.exports = menfessService;
