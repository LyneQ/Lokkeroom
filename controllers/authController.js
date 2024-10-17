import bcrypt from 'bcrypt';
import UserClass from '../models/user.js';

async function register(req, res) {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const User = new UserClass(); // Si vous faites un constructeur dans la classe -> Supprimer la ligne 9 et passer les valeurs directement ici.
    const userCreated = await User.createUser(email, encryptedPassword);
    if (userCreated) {
      res.status(200).send("User successfully created");
    }
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
}

async function login(req, res) {
  // TODO login
}

async function middleware(req, res, next) {
  // TODO middleware
}

// TODO Login et middleware

export default {
  register,
  login,
  middleware
};
