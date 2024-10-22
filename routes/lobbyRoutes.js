import lobbyController from '../controllers/lobbyController.js';


function lobbyRoutes(app){

    app.post('/api/createlobby', lobbyController.createLobby);

    //app.post('/api/addUserLobby', lobbyController.addUserLobby);

    //app.post('/api/removeUserLobby', lobbyController.removeUserLobby);

}

export default lobbyRoutes;