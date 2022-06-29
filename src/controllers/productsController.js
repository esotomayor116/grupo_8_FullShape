const fs = require('fs');
const path = require('path');

const controller = {
    index: (req, res) => {

    },
    detail: (req, res) => {

    },
    create: (req, res) => {

    },
    store: (req, res) => {

    },
    edit: (req, res) => {
        let id = req.params.id;
		let productToEdit = null;
		for (let i=0; i<products.length; i++) {
			if (products[i].id == id) {
				productToEdit = products[i];
			}
		}
        res.render("./products/productEdit", { productToEdit })
    },
    update: (req, res) => {
      let id = req.params.id;
      for (let i=0; i<products.length; i++) {
        if (products[i].id == id) {
            products[i].name = req.body.name;
            products[i].description = req.body.description;
            products[i].image = req.body.image;
            products[i].state = req.body.state;
            products[i].category = req.body.category;
            products[i].color = req.body.color;
            products[i].size = req.body.size;
            products[i].code = req.body.code;
            products[i].price = req.body.price; 
        }
      }
      res.redirect('/')
    },
    delete: (req, res) => {

    }
}

module.exports = controller;