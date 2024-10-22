import MessageController from '../controllers/messageController.js';


export default function messageRoutes(app) {

    app.get('/api/message/:lobbyId/:messageId', MessageController.getMessage);

    app.get('/api/message/:lobbyId', MessageController.getMessages);
    app.post('/api/message/:lobbyId', MessageController.postMessages);

    app.delete('/api/message/:messageId', MessageController.deleteMessage);

}