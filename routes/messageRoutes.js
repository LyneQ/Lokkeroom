import MessageController from '../controllers/messageController.js';

/**
 * TODO: all routes
 * GET    /api/lobby/[lobby-id]                An array containing all the message from the lobby
 * GET    /api/lobby/[lobby-id]/[message-id]   A single message object from the lobby
 * POST   /api/lobby/[lobby-id]               Send a message to the lobby
 * PATCH  /api/lobby/[message-id]            edit the message (message owner or admin)
 * DELETE /api/messages/[message-id]           delete the message (message owner or admin)
 *
 */
export default function messageRoutes(app) {

    app.get('/api/lobby/:lobbyId/:messageId', MessageController.getMessages);

    app.post('/api/lobby/:lobbyId', MessageController.postMessages);

    app.delete('/api/messages/:messageId', MessageController.deleteMessage);

}