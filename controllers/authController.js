"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const path = require("path");
const db = require(path.resolve("db/users.json"));
const tokenSecret = "super secret";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenSecret;

passport.use(
  new LocalStrategy((username, password, done) => {
    let userFound = false;
    let pwFound = false;
    let authUser = {
      username: null,
      password: null,
    };

    db.users.forEach((user) => {
      if (user.username === username) {
        userFound = true;
        if (user.password === password) {
          pwFound = true;
          authUser.password = user.password;
          authUser.username = user.username;
        }
      }
    });

    if (userFound && pwFound) {
      const token = jwt.sign(authUser, tokenSecret);
      delete authUser.password;

      return done(null, { authUser, token });
    } else {
      if (userFound) {
        return done(null, { error: "Incorrect password." });
      } else {
        return done(null, { error: "Incorrect username." });
      }
    }
  })
);

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    if (jwt_payload) {
      return done(null, jwt_payload.username);
    } else {
      return done(null, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const login = (req, res) => {};

const checkAuth = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) {
        console.log("Not authenticated or user expired");
        reject("Not authenticated or user expired");
      }
      resolve(user);
    })(req, res, next);
  });
};

module.exports = {
  login,
  checkAuth,
  passport,
};
