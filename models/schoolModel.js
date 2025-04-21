const db = require('../config/db');

class School {
    static async create({ name, address, latitude, longitude }) {
        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM schools');
        return rows;
    }
}

module.exports = School;