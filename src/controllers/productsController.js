const fs = require('fs');
const { devNull } = require('os');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');

const controller = {
    index: (req, res) => {
      db.Product.findAll()
        .then(products => res.render('./products/home', { products,  user: req.session.userLogged}))
       },
    detail: (req, res) => {
      let idProducto = req.params.id;
      db.Product.findByPk(idProducto)
        .then(product => db.Product.findAll({ where: {productCategoryId: product.productCategoryId} })
          .then(relatedProducts => 
            res.render('./products/productDetail', { product, relatedProducts, user: req.session.userLogged } )))
    },
    create: (req, res) => {
      res.render('./products/productCreate', { user: req.session.userLogged })
    },
    store: (req, res) => {
      if(req.file != undefined) {
        req.body.productMainImage = req.file.filename;
      }
      let productStatus = db.ProductStatus.findOne({where: {statusName: req.body.productStatus}});
      let productCategory = db.ProductCategory.findOne({where: {categoryName: req.body.productCategory}});
      let productColor = db.ProductColor.findOne({where: {colorName: req.body.productColor}});
      let productSize = db.ProductSize.findOne({where: {sizeName: req.body.productSize}});
      Promise.all([productStatus, productCategory, productColor, productSize])
        .then(([status, category, color, size]) => {
          if (color != null) {
              color = color.colorId;
          }
          if (size != null) {
             size = size.sizeId;
          }
          db.Product.create({
              productName: req.body.productName,
              productDescription: req.body.productDescription,
              productMainImage: req.body.productMainImage,
              productStatusId: status.statusId,
              productCategoryId: category.categoryId,
              productColorId: color,
              productSizeId: size,
              productCode: req.body.productCode,
              productUnitPrice: req.body.productUnitPrice
            })
            .then (() => {
              res.redirect('/products')
            })
          }
          //}
          )
      },
    edit: (req, res) => {
        let id = req.params.id;
    db.Product.findByPk(id)
      .then(function(productToEdit) {
        res.render("./products/productEdit", { productToEdit , user: req.session.userLogged })
      })
		},
    update: (req, res) => {
      if(req.file != undefined) {
        req.body.productMainImage = req.file.filename;
      }
      let productStatus = db.ProductStatus.findOne({where: {statusName: req.body.productStatus}});
      let productCategory = db.ProductCategory.findOne({where: {categoryName: req.body.productCategory}});
      let productColor = db.ProductColor.findOne({where: {colorName: req.body.productColor}});
      let productSize = db.ProductSize.findOne({where: {sizeName: req.body.productSize}});
      let productSearch = db.Product.findByPk(req.params.id);
      Promise.all([productStatus, productCategory, productColor, productSize, productSearch])
          .then(([status, category, color, size, product]) => {
          if (status == null) {
             status = req.body.productStatus;
          }
          if (category == null) {
             category =  req.body.productCategory;
          }
          if (color != null) {
              color = color.colorId;
          }
          if (size != null) {
             size = size.sizeId;
          }
            db.Product.update({
              productName: req.body.productName,
              productDescription: req.body.productDescription,
              productMainImage: req.body.productMainImage,
              productStatusId: status.statusId,
              productCategoryId: category.categoryId,
              productColorId: color,
              productSizeId: size,
              productCode: req.body.productCode,
              productUnitPrice: req.body.productUnitPrice
            }, {
              where: {productId : product.productId}
            })
          res.redirect('/products')
          })
    },
    delete: (req, res) => {
      let id = req.params.id;
      newProducts = products.filter(function(product){
        return product.productId != id;
      })
      fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), 'utf-8')
		  res.redirect('/products')
    }
};

module.exports = controller;