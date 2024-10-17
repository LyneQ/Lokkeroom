const pool = require('../config/db');

class User {

    static async createUser(email, password){
        const conn = await pool.getConnection();
        try{
            const results = await conn.query('INSERT INTO users (email, password) VALUES (?,?)',[email, password]);
            return results.insertId; 
        }finally{
            if (conn) conn.release();
        }
    }

    static async authenticate(email, password){

        const conn = await pool.getConnection();
        try{
            const rows = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
            return rows[0];
        }finally{
            if (conn) conn.release();
        }
    }
}       

module.exports = User;