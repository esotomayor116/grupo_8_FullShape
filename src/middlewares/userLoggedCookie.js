const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userLoggedCookie (req, res, next) {
    if (req.cookies.userLogData != undefined) {
      let emailInCookie = req.cookies.userLogData[0];
      let passwordInCookie = req.cookies.userLogData[1];
      db.User.findOne({where: {
        userEmail: emailInCookie,
        userPassword: passwordInCookie
      }})
        .then(function(userFound) {
          if (req.session) {
            req.session.userLogged = userFound;
          }
      })
    }
    next();
}


module.exports = userLoggedCookie;