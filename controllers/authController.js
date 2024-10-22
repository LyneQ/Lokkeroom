import bcrypt from "bcrypt";
import UserClass from "../models/user.js";

async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Email and password are required");

    const User = new UserClass();
    const userExists = await User.getUserByEmail(email);

    console.log(userExists);

    if (userExists.length > 0) return res.status(400).send("An account with that email already exists");

    const encryptedPassword = await bcrypt.hash(password, 1);
    const userCreated = await User.createUser(email, encryptedPassword);

    if (userCreated) {
      res.status(200).send("User successfully created");
    } else {
        res.status(400).send("User could not be created");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Bad Request`);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Email and password are required");


    const User = new UserClass();
    const user = await User.getUserByEmail(email);
    console.log(user);
    const match = await bcrypt.compare(password, user[0].password);

    if (match) {
      res.status(200).send("User successfully authenticated");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Bad Request`);
  }
}

async function middleware(req, res, next) {
  // TODO middleware
}

export default {
  register,
  login,
  middleware,
};
