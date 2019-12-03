const express = require("express");
const mongoose = require("mongoose");

//Router variable
const taskRouter = require("./routes/heros");
const villainRouter = require("./routes/villains");

// packages
const bodyParser = require('body-parser');

const url = "mongodb://localhost:27017/demodb";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(
  db => console.log("Successfully connected to MongodB server"),
  err => console.log(err)
);

// basic auth using base64 encoded bearer token
app.use((request, response, next) => {
  // authorization header
    const authorization = request.headers['authorization'];
    if(authorization) {
      // decoding base64 and spliting username:password
      const credentials = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii').split(':');
      // find the first user
      require('./models/user').findOne({
        username: credentials[0]
      }).then(user => {
        // compare passwords
        require('bcrypt').compare(credentials[1], user.password, (err, result) => {
          if(!err && result) {
            // set authenticated user
            request.user = user;
          }
        });
      }).catch(err => next());
    }
    next();
});

app.use('/api', require('./routes/auth'));
//Route
app.use("/heros", taskRouter);
app.use("/villain", villainRouter);
app.use('/users', require('./routes/user'));






app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ message: err.message });
});

app.listen(PORT, () => {
  console.clear();
  console.log(`App is running at localhost:${PORT}`);
});

