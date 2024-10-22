import connexion from "../config/db.js";

export default class LobbyClass {
    async createLobby(name, adminID) {
        try {
            const [adminExists] = await connexion.query(`SELECT * FROM users WHERE id = ?`, [
                adminID,
            ]);

            if (adminExists.length === 0) {
                throw new Error("user not found");
            }

            const result = await connexion.query(
                `INSERT INTO lobbies (name, admin_id) VALUES (?,?)`,
                [name, adminID]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    async addUser(userId, lobbyId, adminId) {
        try {
            const [lobbyExists] = await connexion.query(
                "SELECT * FROM lobbies WHERE id = ?",
                [lobbyId]
            );

            if (lobbyExists.length === 0) {
                return false;
            }

            const [isAdmin] = await connexion.query(
                "SELECT * FROM lobbies WHERE id = ? AND admin_id = ?",
                [lobbyId, adminId]
            );

            if (isAdmin.length === 0) {
                return false;
            }

            const [userExists] = await connexion.query("SELECT * FROM users WHERE id = ?", [
                userId,
            ]);

            if (userExists.length === 0) {
                return false;
            }

            const result = await connexion.query(
                "INSERT INTO lobby_users (lobby_id, user_id) VALUES (?,?)",
                [lobbyId, userId]
            );
            return result;
        } catch (error) {
            throw error;
    }
    }
    
    async removeUser(lobbyId, userId, adminId) {
        try{
            const [lobbyExists] = await connexion.query(
                "SELECT * FROM lobbies WHERE id = ?",
                [lobbyId]
            );
            if (lobbyExists.length === 0) {
                return false;
            }

            const [userExists] = await connexion.query(
                "SELECT * FROM users WHERE id = ?",
                [userId]
            );
            if (userExists.length === 0) {
                return false;
            }

            const [isAdmin] = await connexion.query(
                "SELECT * FROM lobbies WHERE id = ? AND admin_id = ?",
                [lobbyId, adminId]
            );
            if (isAdmin.length === 0) {
                return false;
            }

            const result = await connexion.query(
                "DELETE FROM lobby_users WHERE lobby_id = ? AND user_id = ?",
                [lobbyId, userId]
            );

            return result;
            
        }catch(error){
            throw error;
    }
    }
}
