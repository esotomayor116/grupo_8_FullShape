const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        res.render('./users/login');
    },
    access: (req, res) => {
      let userFound = users.find(oneUser => oneUser.userEmail == req.body.userEmail)
      if (userFound) {
        /*let passwordIsOk = bcrypt.compareSync(req.body.userPassword, userFound.userPassword);
        if (passwordIsOk) {
          res.render('./products/home', { products });
        } else {
          res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
        }*/
        if (userFound.userPassword == req.body.userPassword) {
          req.session.userLogged = userFound;
          res.redirect('/products');
          console.log(req.session.userLogged);
        } else {
          res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
        }
      } else {
        res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
      }
    }
}

module.exports = controller;