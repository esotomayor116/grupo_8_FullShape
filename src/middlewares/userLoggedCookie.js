const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedCookie (req, res, next) {
    if (req.cookies.userLogData != undefined) {
      let emailInCookie = req.cookies.userLogData[0];
      let passwordInCookie = req.cookies.userLogData[1];
      let userFound = users.find(oneUser => oneUser.userEmail == emailInCookie && oneUser.userPassword == passwordInCookie);
      if (userFound) {
        req.session.userLogged = userFound;
    }
    }
    next();
}


module.exports = userLoggedCookie;