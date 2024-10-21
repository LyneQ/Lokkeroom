import connexion from '../config/db.js';

export default class User {


    async createUser(email, password){
        try{
            const results = await connexion.query('INSERT INTO users (email, password) VALUES (?,?)',[email, password]);
            return results.insertId; 
        }catch(error){
            throw error;
            }
        }
        
    async getUserByEmail(email) {
        try {
            const rows = await connexion.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}