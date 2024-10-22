import lobbyController from '../controllers/lobbyController.js';


function lobbyRoutes(app){

    app.post('/api/createlobby', lobbyController.createLobby);

    app.get('/api/users/:userid' , lobbyController.getUsers);
    app.get('/api/users', lobbyController.getUsers);

    //app.post('/api/addUserLobby', lobbyController.addUserLobby);

}

export default lobbyRoutes;