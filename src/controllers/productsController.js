const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
      res.render('./products/home', { products });
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

       res.render('./products/productDetail', { product, relatedProducts } );
    },
    create: (req, res) => {
      res.render('./products/productCreate')
    },
    store: (req, res) => {
      let product = req.body;
      product.id = (products.length + 1);
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
        res.render("./products/productEdit", { productToEdit })
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
            products[i].productMainImage = req.body.productMainImage;
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
        return product.id != id;
      })
      fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), 'utf-8')
		res.redirect('/products/')

    },
};

module.exports = controller;