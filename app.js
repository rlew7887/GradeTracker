const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // serves index.html and app.js

// Add course
app.post('/api/add-course', (req, res) => {
    const { course_code, course_name } = req.body;
    try {
        const query = db.prepare(`INSERT INTO Course (course_code, course_name) VALUES (?, ?)`);
        query.run(course_code, course_name);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

// Fetch courses
app.get('/api/courses', (req, res) => {
    try {
        const rows = db.prepare(`SELECT course_code, course_name FROM Course`).all();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'DB error' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});