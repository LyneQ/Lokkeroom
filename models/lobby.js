import pool from "../config/db.js";

export default class LobbyClass {

    async createLobby(name, adminID) {
        const conn = await pool.getConnection();
        try {

            const adminExists = await conn.query('SELECT * FROM users WHERE id = ?', [adminID]);

            if (adminExists.length === 0) return false;

            const results = await conn.query('INSERT INTO lobbies (name, admin_id) VALUES (?,?)', [name, adminID]);
            return results.insertId;
        } finally {
            if (conn) await conn.release();
        }
    }
}