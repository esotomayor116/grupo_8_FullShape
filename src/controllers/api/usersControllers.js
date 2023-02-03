const db = require('../../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

const controller = {
  list: (req, res) => {
    db.User
    .findAll()
    .then(users => {
      users.map (user => {
        delete user.dataValues.userPassword 
        user.dataValues.userDetail = `http://localhost:3000/api/users/${user.userId}`;
        user.dataValues.userImage = `http://localhost:3000/images/users/${user.userImage}`;
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


  store: async (req, res) => {
    req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);
    const user = await db.User.create(req.body);
    const cart = await db.ShoppingCart.create({
      userId: user.userId
    });
    return res.status(200).json({
      data: [ user, cart ],
      created: "success"
    })
  },
  update: async (req, res) => {
    const id = req.params.id;
    const updatedUser = await db.User.update(req.body, {
      where: {
        userId: id
      }
    });
    return res.status(200).json({
      data: updatedUser,
      updated: "success"
    })
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const deletedCart = await db.ShoppingCart.destroy({
      where: {
        userId: id
      }
    })
    const deletedUser = await db.User.destroy({
      where: {
        userId: id
      }
    });
    return res.status(200).json({
      data: [ deletedCart, deletedUser ],
      deleted: "success"
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
          return res.status(404).json('No hay usuarios coincidentes a tu bùsqueda')
        }
        
      })
  },

}

module.exports = controller;