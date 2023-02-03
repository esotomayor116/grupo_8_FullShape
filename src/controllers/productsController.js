const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');
//const { Op } = require("sequelize");


const controller = {
    index: (req, res) => {
      db.Product.findAll()
        .then(products => res.render('./products/home', { products,  user: req.session.userLogged}))
      },
    detail: (req, res) => {
      let id = req.params.id
      let relatedProducts;
      let status;
      let category;
      let color;
      let size;
      db.Product.findByPk(id, {include: ['status','category', 'color', 'size', ] })
        .then(async product => {
          relatedProducts = await db.Product.findAll({where: {productCategoryId: product.productCategoryId}});
          status = product.status;
          category = product.category;
          color = product.color;
          size = product.size;
          res.render('./products/productDetail', { user: req.session.userLogged, product, relatedProducts, status, category, color, size})
        })
    },
    create: async (req, res) => {
      let aCategories = await db.ProductCategory.findAll();
      let aColors = await db.ProductColor.findAll();
      let aSizes = await db.ProductSize.findAll();
      res.render('./products/productCreate', { user: req.session.userLogged, aCategories, aColors, aSizes })
    },
    store: async (req, res) => {
      const validation = validationResult(req);
      if (validation.errors.length > 0) {
          let aCategories = await db.ProductCategory.findAll();
          let aColors = await db.ProductColor.findAll();
          let aSizes = await db.ProductSize.findAll();
          return res.render('./products/productCreate', {
            user: req.session.userLogged, 
            errors: validation.mapped(),
            oldData: req.body,
            aCategories,
            aColors,
            aSizes
          })
      } else {
        req.body.productMainImage = req.file.filename;
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
      }
      },
    edit: (req, res) => {
      let id = req.params.id;
      let aStatus;
      let aCategories;
      let aColors;
      let aSizes;
      db.Product.findByPk(id)
        .then(async productToEdit => {
          aStatus = await db.ProductStatus.findAll();
          aCategories = await db.ProductCategory.findAll();
          aColors = await db.ProductColor.findAll();
          aSizes = await db.ProductSize.findAll();
          res.render('./products/productEdit', { user:req.session.userLogged, productToEdit, aStatus, aCategories, aColors, aSizes})
        })
    },
    update: (req, res) => {
      let id = req.params.id;
      const validation = validationResult(req);
      db.Product.findByPk(id)
      .then(async productToEdit => {
        if (validation.errors.length > 0) {
          let aStatus = await db.ProductStatus.findAll();
          let aCategories = await db.ProductCategory.findAll();
          let aColors = await db.ProductColor.findAll();
          let aSizes = await db.ProductSize.findAll();
          res.render('./products/productEdit', { user:req.session.userLogged, productToEdit, aStatus, aCategories, aColors, aSizes, errors: validation.mapped() })            
        } else {
          req.body.productMainImage = req.file.filename;
          let status = await db.ProductStatus.findOne({where: {statusName: req.body.productStatus} });
          let category = await db.ProductCategory.findOne({where: {categoryName: req.body.productCategory} });
          let color = await db.ProductColor.findOne({where: {colorName: req.body.productColor} });
          let size = await db.ProductSize.findOne({where: {sizeName: req.body.productSize} });
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
            where: {productId: productToEdit.productId}
          }),
          res.redirect('/products')
        }
      })
    },
    delete: (req, res) =>{
      db.Product.destroy({
        where:{
          productId: req.params.id
        }
      })
      .then(() =>  res.redirect ("/products"))
    },  

    search: (req, res) => {
      let Search = req.query.article;
      db.Product.findAll({
        where:{
          productName: {[Op.like]:`%${Search}%`}
              } 
      })

      .then(products => res.render('./products/home', { products,  user: req.session.userLogged}))
      // .then(product => res.redirect(`/products/${product.productId}`))

    },
    shoppingCart: (req, res) => {
        db.ShoppingCart.findOne({
          where: {
            userId: req.params.id
          }
        })
        .then(shoppingCart => {
          const productIds = db.ProductCart.findAll({
            where: {
              shoppingCartId: shoppingCart.shoppingCartId
            }
          })
          const products = db.Product.findAll();
          const allColors = db.ProductColor.findAll();
          const allSizes = db.ProductSize.findAll();
          Promise.all([productIds, products, allColors, allSizes])
            .then(([productIds, products, colors, sizes]) => {
              res.render("./products/shoppingCart", { user: req.session.userLogged, productIds, products, colors, sizes, shoppingCart })
            })    
        })
    },
    addToCart: (req, res) => {
       id = req.params.id;
       user = req.session.userLogged;
       amount = req.body.amount;
       db.Product.findByPk(id)
         .then(async product => {
            const cart = await db.ShoppingCart.findOne({where: {userId: user.userId}})
            totalItems = cart.CartNumberOfItems + parseInt(amount);
            totalPrice = parseFloat(cart.CartTotalPrice) + (product.productUnitPrice * amount);
            await db.ShoppingCart.update({
             CartNumberOfItems: totalItems,
             CartTotalPrice: totalPrice
            }, {
             where: {
               userId: user.userId
             }
            })  
            for (let i=1; i<=amount; i++) {
              await db.ProductCart.create({
                productId: product.productId,
                shoppingCartId : cart.shoppingCartId
              })
            }
            res.redirect(`/shoppingcart/${user.userId}`)     
         })
    },
    updateCart: async (req, res) => {
       id = req.params.id;
       user = req.session.userLogged;
       amount = req.body.amount;
       const previousAmount = await db.ProductCart.findAll({ where: { productId: id } })
       db.Product.findByPk(id)
         .then(async product => {
            const cart = await db.ShoppingCart.findOne({where: {userId: user.userId}})
            totalItems = cart.CartNumberOfItems - parseInt(previousAmount.length) + parseInt(amount);
            totalPrice = parseFloat(cart.CartTotalPrice) - (product.productUnitPrice * previousAmount.length) + (product.productUnitPrice * amount);
            await db.ShoppingCart.update({
             CartNumberOfItems: totalItems,
             CartTotalPrice: totalPrice
            }, {
             where: {
               userId: user.userId
             }
            })
            await db.ProductCart.destroy({
              where: {
                  productId: id
              },
            })
            for (let i=1; i<=amount; i++) {
              await db.ProductCart.create({
                productId: product.productId,
                shoppingCartId : cart.shoppingCartId
              })
            }
            res.redirect(`/shoppingcart/${user.userId}`)        
         })
    },
    DelFromCart:  (req, res) => {
      id = req.params.id;
      user = req.session.userLogged;
      db.Product.findByPk(id)
        .then(async product => {
          const cart = await db.ShoppingCart.findOne({ where:{ userId: user.userId } });
          totalItems = cart.CartNumberOfItems - 1;
          totalPrice = parseFloat(cart.CartTotalPrice) - product.productUnitPrice;
          await db.ShoppingCart.update({
            CartNumberOfItems: totalItems,
            CartTotalPrice: totalPrice
          }, { where: {
            userId: user.userId
          }
        })
        await db.ProductCart.destroy({
          where: {
            productId: product.productId
          },
          limit: 1
        })
        res.redirect(`/shoppingcart/${user.userId}`)
      })
    } 
};

module.exports = controller; 
