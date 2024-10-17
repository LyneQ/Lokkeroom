import authController from '../controllers/authController.js';


function routes(app){

    app.post('/register', authController.register);
    app.post('/login', authController.login);

    app.use(authController.middleware);
}

export default routes;