const DB = require('../../database/models')

module.exports = {
    list: (req, res) => {
        DB.Product.findAll()
          .then(products => {
            return res.json(products)
          })
          }
    }
