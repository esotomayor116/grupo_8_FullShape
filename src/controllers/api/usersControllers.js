const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

const controller = {
  list: (req, res) => {
    db.User
    .findAll()
    .then(users => {
      users.map (user => {
        delete user.dataValues.userPassword 
        user.dataValues.userDetail = `http://localhost:3000/api/users/${user.userId}`
        })
      return res.status(200).json({
        total: users.length,
        data: users,
        status: 200
      })
    })
  },

  show: (req, res) => {
    db.User
    .findByPk(req.params.id)
    .then(user => {
        delete user.dataValues.userPassword 
        user.dataValues.userImage  = `http://localhost:3000/public/images/users/${user.userImage}`
      return res.status(200).json({
        data: user,
        status: 200
      })
    })
  },


  store: (req, res) => {
    db.User
    .create(req.body)
    .then(user => {
      return res.status(200).json({
        data: user,
        status: 200,
        created:'success'
      })
    })
  },

  delete: (req, res) => {
    db.User
      .destroy({
        where: {
          userId: req.params.id
        }
      })
      .then(response => {
        return res.status(200).json({
            data: response,
            status: 200,
            deleted:'success'
          })
      })
  },


  search: (req, res) => {
    db.User
      .findAll({
        where: {
          userNames: {[Op.like]:`%${req.query.keyword}%`} 
        }
      })
      .then(users => {
        if(users.length > 0){
          return res.status(200).json(users)
        } else{
          return res.status(200).json('No hay usuarios coincidentes a tu bùsqueda')
        }
        
      })
  },

}

module.exports = controller;