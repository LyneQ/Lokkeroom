import authController from '../controllers/authController.js';


function authRoutes(app){

    app.post('/register', authController.register);
    app.post('/login', authController.login);

}

export default authRoutes;