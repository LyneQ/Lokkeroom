import lobbyController from '../controllers/lobbyController.js';


function lobbyRoutes(app){

    app.post('/api/createlobby', lobbyController.createLobby);

<<<<<<< HEAD
    app.post('/api/addUserLobby', lobbyController.addUserLobby);

    app.post('/api/removeUserLobby', lobbyController.removeUserLobby);
=======
    app.get('/api/users/:userid' , lobbyController.getUsers);
    app.get('/api/users', lobbyController.getUsers);

    //app.post('/api/addUserLobby', lobbyController.addUserLobby);
>>>>>>> 687b70f0621d68a2a1cc530e7363f6dcd18b0f84

}

export default lobbyRoutes;