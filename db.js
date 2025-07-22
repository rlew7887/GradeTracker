const Database = require('better-sqlite3');
const db = new Database('grades.db');

db.pragma('foreign_keys = ON'); // enable foreign keys

db.prepare(`CREATE TABLE IF NOT EXISTS Course (
    course_code VARCHAR(20) PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
    )`
).run();

db.prepare(`CREATE TABLE IF NOT EXISTS Coursework (
    coursework_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code VARCHAR(20) NOT NULL,
    coursework_type VARCHAR(20),
    current_mark REAL,
    full_mark REAL,
    weightage REAL,
    FOREIGN KEY(course_code) REFERENCES Course(course_code)
    )`
).run();

module.exports = db;