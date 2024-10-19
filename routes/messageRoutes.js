import MessageController from '../controllers/messageController.js';


export default function messageRoutes(app) {

    app.get('/api/lobby/:lobbyId/:messageId', MessageController.getMessage);
    app.get('/api/lobby/:lobbyId', MessageController.getMessages);

    app.post('/api/lobby/:lobbyId', MessageController.postMessages);

    app.delete('/api/messages/:messageId', MessageController.deleteMessage);

}