import LobbyClass from "../models/lobby.js";

async function createLobby(req, res) {
  try {
    const { name, adminID } = req.body;
    if (!name || !adminID)
      return res.status(400).send("Email and password are required");

    const Lobby = new LobbyClass();
    const userCreated = await Lobby.createLobby(name, adminID);

    if (userCreated) {
      res.status(200).send("Lobby successfully created");
    } else {
      res.status(400).send(`Bad Request (missing or incorrect data)`);
    }
  } catch (error) {
    console.error(error.sqlMessage);
    return res.status(400).send(`Bad Request`);
  }
}

await function middlewares(req, res, next) {
  // TODO middleware
};

export default {
  createLobby,
};
