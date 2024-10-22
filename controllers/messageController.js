import MessageClass from "../models/message.js";


async function getMessages(req, res) {
  const { lobbyId } = req.params;

  if (!lobbyId)
    return res.status(400).send("Bad request - missing lobbyID or messageID");

  const Message = new MessageClass();
  const fetchedMessages = await Message.getMessages(lobbyId);
  const messages = fetchedMessages[0];

  if (!messages || messages.length === 0)
    return res.status(404).send("Not found - messages not found");

  res.status(200).send(messages);
}

async function getMessage(req, res) {
  const { lobbyId, messageId } = req.params;

  const Message = new MessageClass();

  if (!lobbyId || !messageId)
    return res.status(400).send("Bad request - missing lobbyID or messageID");

  const fetchedMessage = await Message.getMessageById(lobbyId, messageId);
  const message = fetchedMessage[0];

  if (!message || message.length === 0) {
    return res.status(404).send("Not found - message not found");
  }

  res.status(200).send(message);
}

async function postMessages(req, res) {
  const { lobbyId } = req.params;
  const { content, userId } = req.body;

  if (!lobbyId)
    return res.status(400).send("Bad request - missing lobbyID or messageID");

  try {
    const Message = new MessageClass();
    const message = await Message.sendMessages(lobbyId, userId, content);

    if (!message) {
      return res.status(400).send("Failed to send message");
    }

    res.status(201).send(message[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteMessage(req, res) {
  const { messageId } = req.params;

  if (!messageId)
    return res.status(400).send("Bad request - missing messageID");

  try {
    const Message = new MessageClass();
    const message = await Message.deleteMessage(messageId);

    if (!message) return res.status(404).send("Not found - message not found");

      console.log(message[0])

    res.status(200).send(message[0].affectedRows > 0 ? "Message deleted" : "Failed to delete message");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export default {
  getMessages,
  getMessage,
  postMessages,
  deleteMessage,
};
