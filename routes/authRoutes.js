import authController from '../controllers/authController.js';


function authRoutes(app){

    app.post('/api/register', authController.register);
    app.post('/api/login', authController.login);

}

export default authRoutes;