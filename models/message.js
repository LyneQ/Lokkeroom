import pool from "../config/db.js";

export default class Message {

  async sendMessages(lobbyID, userID, message) {
    const conn = await pool.getConnection();
    try {
      const lobbyExist = await conn.query(
        "SELECT * FROM lobbies WHERE id = ?",
        [lobbyID],
      );

        console.log(lobbyExist.length === 0);

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


}
