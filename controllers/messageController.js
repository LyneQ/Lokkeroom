import MessageClass from "../models/message.js";

/**
 * GET /api/lobby/[lobby-id]                An array containing all the message from the lobby
 * GET /api/lobby/[lobby-id]/[message-id]   A single message object from the lobby
 * POST /api/lobby/[lobby-id]               Send a message to the lobby
 * PATCH /api/lobby/[message-id]            edit the message (message owner or admin)
 */

async function getMessages(req, res) {
  const { lobbyID, messageID } = req;

  switch (true) {
    case lobbyID && !messageID:
      // Get all messages from the lobby
      break;
    case lobbyID && messageID:
      // Get a single message from the lobby
      break;
    default:
      res.status(400).send("Bad request - unknown route");
      break;
  }
}

async function postMessages(req, res) {
  const { lobbyId } = req.params;
  const { content, userId} = req.body;

  if (!lobbyId)
    return res.status(400).send("Bad request - missing lobbyID or messageID");

  const Message = new MessageClass();
  const message = await Message.sendMessages(lobbyId, userId, content);

  if (!message) return res.status(400).send("Bad request - lobbyId not found");

  res.status(201).send(message);
}

function deleteMessage(req, res) {
  res.send("hola");
}

export default {
  getMessages,
  postMessages,
  deleteMessage,
};
