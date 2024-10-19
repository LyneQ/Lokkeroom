import MessageClass from "../models/message.js";

/**
 * GET /api/lobby/[lobby-id]                An array containing all the message from the lobby
 * GET /api/lobby/[lobby-id]/[message-id]   A single message object from the lobby
 * POST /api/lobby/[lobby-id]               Send a message to the lobby
 * PATCH /api/lobby/[message-id]            edit the message (message owner or admin)
 */

async function getMessages(req, res) {
  const { lobbyId } = req.params;

  if (!lobbyId) return res.status(400).send("Bad request - missing lobbyID or messageID");

  const Message = new MessageClass();

  res.status(200).send(await Message.getMessages(lobbyId));
}

async function getMessage(req, res) {
    const { lobbyId, messageId } = req.params;

    const Message = new MessageClass();

    if (!lobbyId || !messageId) return res.status(400).send("Bad request - missing lobbyID or messageID");

    const message = await Message.getMessageById(lobbyId, messageId);

    if (!message) return res.status(400).send("Bad request - lobbyId or messageId not found");

    res.status(200).send(message);

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

async function deleteMessage(req, res) {
  const {messageId} = req.params;

  if (!messageId) return res.status(400).send("Bad request - missing messageID");

  const Message = new MessageClass();
  const message = await Message.deleteMessage(messageId);

  if ( !message ) return res.status(400).send("Bad request - message not found");

  res.status(200).send(message);
}

export default {
  getMessages,
  getMessage,
  postMessages,
  deleteMessage,
};
