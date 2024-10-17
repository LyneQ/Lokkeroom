import pool from '../config/db.js';

export default class User {


    async createUser(email, password){
        const conn = await pool.getConnection();
        try{
            const results = await conn.query('INSERT INTO users (email, password) VALUES (?,?)',[email, password]);
            return results.insertId; 
        }finally{
            if (conn) conn.release();
        }
    }

    async authenticate(email, password){

        const conn = await pool.getConnection();
        try{
            const rows = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
            return rows[0];
        }finally{
            if (conn) conn.release();
        }
    }
}