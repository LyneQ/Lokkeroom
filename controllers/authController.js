const bCrypt = require('bcrypt');
const UserClass = require('../models/user.js');
module.exports =  {
    register: function(req, res){

        try {

            console.log(req.body);
            const {email, password} = req.body;
            bCrypt.genSalt(1, (err, salt) => {
                bCrypt.hash(password, salt, async (err, hash) => {
                    const cryptPassword = hash;
                    const User = new UserClass();
                    await UserClass.createUser(email, cryptPassword);
                    res.send("c'est bon");
                })
            })

        } catch (error) {
            console.log(error);
            res.send("error");
        }

    },
    login: function(){

    },
    middleware: function(){

    }
}