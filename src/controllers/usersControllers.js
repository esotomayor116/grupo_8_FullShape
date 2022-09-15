const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');


const controller = {
    login: (req, res) => {
        res.render('./users/login');
    },
    

    access: (req, res) => {
        //Validacion backend login usuarios
        const validationLog = validationResult(req);

        if (validationLog.errors.length > 0){
          return res.render ('./users/login', {
          errors: validationLog.mapped() ,
          });
        } else{

      db.User.findOne({where: {
        userEmail: req.body.userEmail
      }})
        .then(userFound => {if (userFound) {
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
        }
        })
        /*if (userFound.userPassword == req.body.userPassword) {
          req.session.userLogged = userFound;
          if (req.body.rememberMe) {
              res.cookie('userLogData', [req.body.userEmail, req.body.userPassword], { maxAge: 120000 } )
          }
          res.redirect('/products');
        } else {
          res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
        }*/
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
    /*store: (req, res) => {
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
      }*/
      store2: (req, res) => {
        let userBody = req.body;
        const validation = validationResult(req);
        if (validation.errors.length > 0) {
          return res.render('./users/register', {
            errors: validation.mapped(),
            oldData: req.body
          });
      } else {
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
        }
      },
      edit: (req, res) => {
        let id = req.params.id;
        db.User.findByPk(id, {raw: true})
          .then(function(userToEdit){
            res.render("./users/userEdit", {userToEdit});
          })
      },

      update: (req, res) => {
        let id = req.params.id;
        db.User.findByPk(id)
        .then (function(user){
          if (req.body.userReceiveOffersAndNews == "on"){
            req.body.userReceiveOffersAndNews = true
          } else{
            req.body.userReceiveOffersAndNews = false
          }
          if(req.body.userPassword == ''){
          req.body.userPassword = user.userPassword
        } else {
          req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);
        }
        if (req.file) {
          req.body.userImage = req.file.filename;
        } else{
          req.body.userImage = user.userImage;
        }
        db.User.update({
          userNames: req.body.userNames,
          userLastNames: req.body.userLastNames,
          userPhone: req.body.userPhone,
          userEmail: req.body.userEmail,
          userReceiveOffersAndNews: req.body.userReceiveOffersAndNews,
          userPassword: req.body.userPassword,
          userImage:req.body.userImage
        }, {
          where: {userId : user.userId}
        })
        .then(function(){
          res.redirect('/users/' + user.userId)
        })
        }) 
      },
      show: (req, res) => {
        let idUser = req.params.id;
        let sessionUser = req.session.userLogged; 
        if (idUser == sessionUser.userId) {
          db.User.findByPk(idUser)
            .then(user =>{
            res.render('./users/userDetail', {user})
            })
        } else {
          res.redirect('/users/' + sessionUser.userId);
        }
      }
    }

module.exports = controller;