import LobbyClass from "../models/lobby.js";

async function createLobby(req, res) {
  try {
    const { name, adminID } = req.body;

    if (!name || !adminID) {
      return res.status(400).send("Email and password are required");
    }

    const Lobby = new LobbyClass();
    const userCreated = await Lobby.createLobby(name, adminID);

    if (userCreated) {
      res.status(200).send("Lobby successfully created");
    } else {
      res.status(400).send(`Bad Request (missing or incorrect data)`);
    }
  } catch (error) {
    console.error(error.sqlMessage);
    return res.status(400).send(error.message);
  }
}

async function addUserLobby(req, res) {
  const { userId, lobbyId, adminId } = req.body;

  if (!userId || !lobbyId || !adminId) {
    return res.status(400).send("Missing data");
  }

  try {
    const userLobby = new LobbyClass();
    const userAdded = await userLobby.addUser(userId, lobbyId, adminId);

    if (userAdded) {
      res.status(200).send("User successfully added to lobby");
    } else {
      res.status(400).send("Bad request (missing or incorrect data)");
    }
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
}

async function removeUserLobby(req, res) {
  const { lobbyId, userId, adminId } = req.body;
  
  if (!lobbyId || !userId || !adminId) {
    return res.status(400).send("Missing data");
  }

  try {
    const userLobby = new LobbyClass();
    const userRemoved = await userLobby.removeUser(lobbyId, userId, adminId);

    if (userRemoved) {
      res.status(200).send("User successfully removed from lobby");
    } else {
      res.status(400).send("Bad request (missing or incorrect data)");
    }
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
}

await function middlewares(req, res, next) {
  // TODO middleware
};

export default {
  createLobby,
  addUserLobby,
  removeUserLobby,
};
