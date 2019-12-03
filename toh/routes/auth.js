
// routes/auth.js
const express = require("express");
const users = require("../models/user");
const bycrypt = require('bcrypt');

const router = express.Router();

router.route('/login').post((request, response, next) => {
   users.findOne({
        username: request.body.username
   }).then(user => {
       if(!user) return next(new Error('Invalid credentials: Username'));
       bycrypt.compare(request.body.password, user.password, (err, result) => {
           if(!err && result) {
               // base64 bearer token string containing username:passowrd
               return response.json({
                   token: Buffer.from([user.username, request.body.password].join(':')).toString('base64')
               });
           }
           next(new Error('Invalid credentials: Password'));
       });
   }); 
});

module.exports = router;