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
      let relatedProducts;
      let productStatus;
      let productCategory;
      let productColor;
      let productSize;
      db.Product.findByPk(idProducto)
        .then(product => {
          related =  db.Product.findAll({ where: {productCategoryId: product.productCategoryId} })
          productStatus = db.ProductStatus.findOne({where: {statusId: product.productStatusId}});
          productCategory = db.ProductCategory.findOne({where: {categoryId: product.productCategoryId}});
          productColor = db.ProductColor.findOne({where: {colorId: product.productColorId}});
          productSize = db.ProductSize.findOne({where: {sizeId: product.productSizeId}});
          Promise.all([related, productStatus, productCategory, productColor, productSize])
            .then(([relatedProducts, status, category, color, size ]) => {
              res.render('./products/productDetail', { product, relatedProducts, status, category, color, size, user: req.session.userLogged })
            })
        })
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
        let allStatus;
        let allCategories; 
        let allColors;
        let allSizes;
    db.Product.findByPk(id)
      .then(function(productToEdit) {
        allStatus = db.ProductStatus.findAll();
        allCategories = db.ProductCategory.findAll();
        allColors = db.ProductColor.findAll();
        allSizes = db.ProductSize.findAll();
          Promise.all([allStatus, allCategories, allColors, allSizes])
            .then(([aStatus, aCategories, aColors, aSizes]) => {
              res.render("./products/productEdit", { productToEdit, aStatus, aCategories, aColors, aSizes , user: req.session.userLogged })
            })
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

    },
    delete: function (req, res) {
      products.findByPk(req.params.id)
      .then(function (idProducto){
        res.render("productDetail",{idProducto})
      })
    },
    search: (req, res) => {
      let loBuscado = req.query.articulo;
      db.Product.findAll({
        where:{
          productName: {[Op.Like]:'%'+loBuscado+'%'}
              } 
      })
      .then(products => res.render('./products/home', { products,  user: req.session.userLogged}))

    }

};

module.exports = controller; 
