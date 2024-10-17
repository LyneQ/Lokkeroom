
const authController = require('../controllers/authController');


module.exports = function(app){

    app.post('/register', authController.register);
    app.post('/signin', authController.login);

    app.use(authController.middleware);
}