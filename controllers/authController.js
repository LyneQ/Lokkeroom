const bCrypt = require('bcrypt');
const UserClass = require('../models/user.js');
module.exports =  {
    register: function(req, res){
        console.log(req.body);
        return res.send("c'est pas bon");
        const {email, password} = req.body;
        // bCrypt.genSalt(1, (err, salt) => {
            bCrypt.hash(password, salt, async (err, hash) => {
                const cryptPassword = hash;
                const User = new UserClass();
                await User.createUser(email, cryptPassword);
                res.send("c'est bon");
            })
        // })

    },
    login: function(){

    },
    middleware: function(){

    }
}