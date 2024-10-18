import lobbyController from '../controllers/lobbyController.js';


function lobbyRoutes(app){

    app.post('/lobbies', lobbyController.createLobby);

}

export default lobbyRoutes;