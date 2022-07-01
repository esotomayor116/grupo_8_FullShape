const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
      res.render('./products/home', { products });
    },
    detail: (req, res) => {
      let id = req.params.id;
      res.render('./products/productDetail',{ id });
    },
    create: (req, res) => {

    },
    store: (req, res) => {

    },
    edit: (req, res) => {
        let id = req.params.id;
		let productToEdit = null;
		for (let i=0; i<products.length; i++) {
			if (products[i].productId == id) {
				productToEdit = products[i];
			}
		}
        res.render("./products/productEdit", { productToEdit })
    },
    update: (req, res) => {
      let id = req.params.id;
      for (let i=0; i<products.length; i++) {
        if (products[i].productId == id) {
            products[i].productName = req.body.productName;
            products[i].productDescription = req.body.productDescription;
            products[i].productMainImage = req.body.productMainImage;
            products[i].productStatus = req.body.productStatus;
            products[i].productCategory = req.body.productCategory;
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