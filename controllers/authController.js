import bcrypt from 'bcrypt';
import UserClass from '../models/user.js';


async function register(req, res) {
    try {
        console.log(req.body);
        const {email, password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const User = new UserClass();
        await User.createUser(email, encryptedPassword);

    } catch (error) {
        console.log(error);
        res.send("error");
    }
}

async function login (req, res) {
    // TODO login
}

async function middleware (req, res, next) {
    // TODO middleware
}

// TODO Login et middleware

export default {
    register,
    login,
    middleware
};