module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // Example route: Fetch all characters
    router.get('/', (req, res) => {
        db.query('SELECT * FROM characters', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    return router;
};
