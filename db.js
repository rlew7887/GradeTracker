const mysql = require('better-mysqlite3');
const db = new mysql('grades.db');

db.serialize(() => { // ensure queries run sequentially
    db.run("PRAGMA foreign_keys = ON"); // enable foreign keys
    db.run(`CREATE TABLE IF NOT EXISTS Course (
        course_code VARCHAR(20) PRIMARY KEY,
        course_name VARCHAR(50) NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS Coursework (
        coursework_id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_code VARCHAR(20) NOT NULL,
        coursework_type VARCHAR(20),
        current_mark INTEGER,
        full_mark INTEGER,
        weightage INTEGER,
        FOREIGN KEY(course_code) REFERENCES Course(course_code)
    )`);
});

db.close();