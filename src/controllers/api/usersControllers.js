const DB = require('../../database/models')

module.exports = { 
    list: (req, res) => {
        DB.User.findAll()
        .then(users => {
            return res.json(users)
        })
    }
}

