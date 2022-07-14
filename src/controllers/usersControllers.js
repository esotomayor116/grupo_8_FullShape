const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    access: (req, res) => {
        res.render('./users/login');
    },
    login: (req, res) => {

    }
}

module.exports = controller;