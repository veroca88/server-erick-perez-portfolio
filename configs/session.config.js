const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = app => {
  //              |
  //              app is just a placeholder here but will become a real "app"
  //              in the app.js when this file gets imported/required there
  // console.log(req, res);


  app.use(
    session({
      secret: process.env.SESS_SECRET,
      cookie: { maxAge: 3600000, somethingElse: 'test' }, // 1 hour
      resave: true,
      saveUninitialized: true,
      // duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
      // activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 * 1000,
      })
    })
  );
};

