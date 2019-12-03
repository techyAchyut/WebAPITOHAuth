const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bycrypt = require('bcrypt');

router.route('/create').post((request, response, next) => {
    const userData = request.body;
    user.findOne({
        username: userData.username
    }).then(user => {
        if(!!user) return next(Error('Username already taken'));
        bycrypt.hash(userData.password, 10, function(err, hashed) {
            if(err) return next(err);
            userData.password = hashed;
            user.create(userData).then(user => {
                response.statusCode = 201;
                response.json(user);
            }).catch(next);
        });
    });
});


module.exports = router;