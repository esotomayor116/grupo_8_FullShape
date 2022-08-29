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

      store2: (req, res) => {
        let userBody = req.body;

        if (req.file) {
          userBody.userImage = req.file.filename;
        } else{
          userBody.userImage = "User_Avatar.jpeg"
        };

        userBody.userId = (users.length + 1);
        if (userBody.userReceiveOffersAndNews == "on"){
          userBody.userReceiveOffersAndNews = true
        } else{
          userBody.userReceiveOffersAndNews = false
        }
        userBody.userPassword = bcrypt.hashSync(userBody.userPassword, 10)

        
//Información que sera capturada por el metodo Create para crear usuario
        db.User.create({
          userEmail: req.body.userEmail,
          userImage: userBody.userImage,
          userNames: req.body.userNames,
          userLastNames: req.body.userLastNames,
          userPassword: userBody.userPassword,
          userPhone: req.body.userPhone,
          userReceiveOffersAndNews: userBody.userReceiveOffersAndNews,
          userType: 'comprador',

        })
          .then(function () {
            res.redirect('/users')
          })

      },

      show: (req, res) => {
        let idUser = req.params.id;
        db.User.findByPk(idUser)
          .then(user => res.render('./users/userDetail', { user })) // Debes insertar un "if (user == req.session.userLogged) {""}";
        },                                                          // en el "else {""}", pones el mismo "res.render("")", solo que le pones
                                                                    // "user: req.session.userLogged" en el parametro dentro de llaves.
}

module.exports = controller;