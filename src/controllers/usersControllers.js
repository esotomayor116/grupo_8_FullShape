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
        } else {
          res.render('./users/login', { errors: { log:{ msg: 'Credenciales no válidas ' } } });
        }
        } )
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
    index: async (req, res) => {
      const users = await db.User.findAll();
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
      store2: async (req, res) => {
        let userBody = req.body;
        const validation = validationResult(req);
        if (validation.errors.length > 0) {
          return res.render('./users/register', {
            errors: validation.mapped(),
            oldData: req.body
          });
        } else {
        // if (req.file) {
          userBody.userImage = req.file.filename;
        // } else{
        //   userBody.userImage = "User_Avatar.jpeg"
        // };
        userBody.userPassword = bcrypt.hashSync(userBody.userPassword, 10)

        const user = await db.User.create({
          userEmail: req.body.userEmail,
          userImage: userBody.userImage,
          userNames: req.body.userNames,
          userLastNames: req.body.userLastNames,
          userPassword: userBody.userPassword,
          userPhone: req.body.userPhone,
          userReceiveOffersAndNews: userBody.userReceiveOffersAndNews,
          userType: req.body.userType,

        })
        const cart = await db.ShoppingCart.create({
          userId: user.userId,
          CartNumberOfItems: 0,
          CartTotalPrice: 0
        })
        res.redirect('/users')
      }
      },
      edit: (req, res) => {
        id = req.params.id;
        sessionUser = req.session.userLogged;
        if (id == sessionUser.userId) {
          db.User.findByPk(id)
            .then(user => {
              res.render('./users/userEdit', { userToEdit: user });
            })
        } else {
          res.redirect(`/users/${sessionUser.userId}/edit`);
        }
      },
      update: (req, res) => {
        id = req.params.id;
        sessionUser = req.session.userLogged;
        const validations = validationResult(req);
        if (validations.errors.length > 0) {
          res.render('./users/userEdit', { userToEdit: sessionUser, errors: validations.mapped() })
        } else {
          if (req.body.userPassword) {
            req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);
          } else {
            req.body.userPassword = sessionUser.userPassword;
          }
          if (req.file) {
            req.body.userImage = req.file.filename;
          } else {
            req.body.userImage = sessionUser.userImage;
          }
          db.User.update({
            userEmail: req.body.userEmail,
            userImage: req.body.userImage,
            userNames: req.body.userNames,
            userLastNames: req.body.userLastNames,
            userPassword: req.body.userPassword,
            userPhone: req.body.userPhone,
            userReceiveOffersAndNews: req.body.userReceiveOffersAndNews,
          }, {
            where: {userId: id}
          })
            .then(() => {
              res.redirect(`/users/${id}`);
            })
        }
      },
      show: (req, res) => {
        id = req.params.id;
        sessionUser = req.session.userLogged;
        if (id == sessionUser.userId) {
          db.User.findByPk(id)
            .then(user => {
              res.render('./users/userDetail', { user: user });
            })
        } else {
          res.redirect(`/users/${sessionUser.userId}`);
        }
      }
    }

module.exports = controller;