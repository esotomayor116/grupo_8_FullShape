const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
      res.render('./products/home', { products,  user: req.session.userLogged});
    },

    // detail: (req, res) => {
    //   let id = req.params.id;
    //   res.render('./products/productDetail',{ id });
    // },
    
    detail: (req, res) => {
      let idProducto = req.params.id;
      let product;
      for (let i=0; i<products.length; i++) {
              if (products[i].productId == idProducto) {
          product = products[i];
        }
      }
      let relatedProducts = products.filter(function(related){
        return related.productCategory == product.productCategory
  
      });

       res.render('./products/productDetail', { product, relatedProducts, user: req.session.userLogged } );
    },
    create: (req, res) => {
      res.render('./products/productCreate', { user: req.session.userLogged })
    },
    store: (req, res) => {
      if (req.body.productColor == "") {
        req.body.productColor = null;
      }
      if (req.body.productSize == "") {
        req.body.productSize = null;
      }
      let product = req.body;
      product.productMainImage = req.file.filename;
      product.productId = (products.length + 1);
      products.push(product);
      fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
      res.redirect('/products')
      },
    edit: (req, res) => {
        let id = req.params.id;
		let productToEdit = null;
		for (let i=0; i<products.length; i++) {
			if (products[i].productId == id) {
				productToEdit = products[i];
			}
		}
        res.render("./products/productEdit", { productToEdit , user: req.session.userLogged })
    },
    update: (req, res) => {
      let id = req.params.id;
      if (req.body.productColor == "") {
        req.body.productColor = null;
      }
      if (req.body.productSize == "") {
        req.body.productSize = null;
      }
      for (let i=0; i<products.length; i++) {
        if (products[i].productId == id) {
            console.log(req.body);
            products[i].productName = req.body.productName; //LA FALLA ESTÁ EN EL BODY!
            products[i].productDescription = req.body.productDescription;
            products[i].productMainImage = req.file.filename;
            products[i].productStatus = req.body.productStatus;
            products[i].productCategory = req.body.productCategory;
            products[i].productColor = req.body.productColor;
            products[i].productSize = req.body.productSize;
            products[i].productCode = req.body.productCode;
            products[i].productUnitPrice = req.body.productUnitPrice; 
        }
      }
      fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
      res.redirect('/products')
    },
    delete: (req, res) => {
      let id = req.params.id;
      newProducts = products.filter(function(product){
        return product.productId != id;
      })
      fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), 'utf-8')
		  res.redirect('/products')

    },
};

module.exports = controller;