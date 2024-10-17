import pool from '../config/db.js';

export default class User {
  // Ici vous pourriez faire un constructeur pour ajouter définir les champs directement lors de l'instanciation.
  async createUser(email, password) {
    const connection = await pool.getConnection();
    try {
      const results = await connection.query('INSERT INTO users (email, password) VALUES (?,?)', [email, password]);
      return results.insertId;
    } finally {
      if (connection) await connection.release();
    }
  }

  async authenticate(email, password) {
    const connection = await pool.getConnection();
    try {
      const rows = await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
      return rows[0];
    } finally {
      if (connection) await connection.release();
    }
  }
}
