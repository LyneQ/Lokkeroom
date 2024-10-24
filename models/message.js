import connexion from "../config/db.js";

export default class Message {

  async sendMessages(lobbyID, userID, message) {
    try {
      const lobbyExist = await connexion.query(
        "SELECT * FROM lobbies WHERE id = ?",
        [lobbyID],
      );

      if ( lobbyExist.length === 0 ) return false;

      const results = await connexion.query(
        "INSERT INTO messages (lobby_id, user_id, content) VALUES (?,?,?)",
        [lobbyID, userID, message],
      );
      return results[0].insertId.toString();
    } catch (error) {
        console.error(error);
      return false;
    }
  }

  async editMessage(messageID, message, userID) {
    try {
      const messageExist = await connexion.query("SELECT * FROM messages WHERE id = ? AND user_id = ? ", [messageID, userID]);

      if( messageExist[0].length !== 1 ) return false;

      return connexion.query("UPDATE messages SET content = ? WHERE id = ? AND user_id = ?", [message, messageID, userID]);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getMessages(lobbyID) {
    try {
        return await connexion.query("SELECT * FROM messages WHERE lobby_id = ?", [lobbyID]);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getMessageById(lobbyID, messageID) {
    try {
      return await connexion.query("SELECT * FROM messages WHERE lobby_id = ? AND id = ?", [lobbyID, messageID]);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteMessage(messageID) {
    try {
      const messageExist = await connexion.query("SELECT * FROM messages WHERE id = ?", [messageID]);

      if( messageExist[0].length === 0 ) return false;

      return connexion.query("DELETE FROM messages WHERE id = ?", [messageID]);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}
