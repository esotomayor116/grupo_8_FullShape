const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {
        res.render('./users/login');
    },
    access: (req, res) => {
      let userFound = users.find(oneUser => oneUser.userEmail == req.body.userEmail);
      if (userFound) {
        let passwordIsOk = bcrypt.compareSync(req.body.userPassword, userFound.userPassword);
        if (passwordIsOk) {
          req.session.userLogged = userFound;
          if (req.body.rememberMe) {
              res.cookie('userLogData', [req.body.userEmail, userFound.userPassword ], { maxAge: 120000 } )
          }
          res.redirect('/products');
        } else {
          res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
        }
        /*if (userFound.userPassword == req.body.userPassword) {
          req.session.userLogged = userFound;
          if (req.body.rememberMe) {
              res.cookie('userLogData', [req.body.userEmail, req.body.userPassword], { maxAge: 120000 } )
          }
          res.redirect('/products');
        } else {
          res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
        }*/
      } else {
        res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
      }
    },
    logout: (req, res) => {
      req.session.destroy();
      res.clearCookie('userLogData');
      res.redirect('/products');
    },
    index: (req, res) => {
      res.render('./users/index', { users });
    },
    create: (req, res) => {
      res.render("./users/register");
    },

    store: (req, res) => {
      let user = req.body;
      
      if (req.file) {
        user.userImage = req.file.filename;
      } else{
        user.userImage = "User_Avatar.jpeg"
      };

      user.userId = (users.length + 1);
      if (user.userReceiveOffersAndNews == "on"){
        user.userReceiveOffersAndNews = true
      } else{
        user.userReceiveOffersAndNews = false
      }
      user.userPassword = bcrypt.hashSync(user.userPassword, 10)
      users.push(user);
      fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf-8');
      res.redirect('/users')
      },

      show: (req, res) => {
        let idUser = req.params.id;
        db.User.findByPk(idUser)
          .then(user => res.render('./users/userDetail', { user }))
        },
}

module.exports = controller;