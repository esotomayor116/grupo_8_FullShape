const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userLoggedCookie (req, res, next) {
    if (req.cookies.userLogData != undefined) {
      console.log(req.cookies);
      let emailInCookie = req.cookies.userLogData[0];
      let passwordInCookie = req.cookies.userLogData[1];
      db.User.findOne({where: {
        userEmail: emailInCookie,
        userPassword: passwordInCookie
      }})
        .then(function(userFound) {
          req.session.userLogged = userFound;
      })
    } else {}
    next();
}


module.exports = userLoggedCookie;