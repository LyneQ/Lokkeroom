import pool from "../config/db.js";

export default class Message {

  async sendMessages(lobbyID, userID, message) {
    const conn = await pool.getConnection();
    try {
      const lobbyExist = await conn.query(
        "SELECT * FROM lobbies WHERE id = ?",
        [lobbyID],
      );

      if ( lobbyExist.length === 0 ) return false;

      const results = await conn.query(
        "INSERT INTO messages (lobby_id, user_id, content) VALUES (?,?,?)",
        [lobbyID, userID, message],
      );
      return results.insertId.toString();
    } finally {
      if (conn) await conn.release();
    }
  }

  async getMessages(lobbyID) {
    const conn = await pool.getConnection();
    try {
        return await conn.query("SELECT * FROM messages WHERE lobby_id = ?", [lobbyID]);

    } finally {
        if (conn) await conn.release();
    }
  }

  async getMessageById(lobbyID, messageID) {
    const conn = await pool.getConnection();
    try {
      return await conn.query("SELECT * FROM messages WHERE lobby_id = ? AND id = ?", [lobbyID, messageID]);
    } finally {
      if (conn) await conn.release();
    }
  }

  async deleteMessage(messageID) {
    const conn = await pool.getConnection();
    try {
      const messageExist = await conn.query("SELECT * FROM messages WHERE id = ?", [messageID]);

      if( messageExist.length === 0 ) return false;

      return !!conn.execute("DELETE FROM messages WHERE id = ?", [messageID]);
    } finally {
      if (conn) await conn.release();
    }
  }

}
