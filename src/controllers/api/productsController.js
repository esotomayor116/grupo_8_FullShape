const DB = require('../../database/models')

module.exports = {
    list: (req, res) => {
        const categories = DB.ProductCategory.findAll({include: 'products'})
        const products = DB.Product.findAll({include: ['status','categories', 'colors', 'sizes', ] })
        Promise.all([categories, products])
            .then(([categories, products]) => {
                const countByCategory = categories.map(category => {
                const categoryCount = category.dataValues.products.length;
                return `${category.categoryName}: ${categoryCount}`
              })
              products.map(product => {
                product.dataValues.productDetail = `http://localhost:3000/api/products/${product.productId}`
                product.dataValues.productMainImage = `http://localhost:3000/images/products/${product.productMainImage}`
                delete product.dataValues.productStatusId;
                delete product.dataValues.productCategoryId;
                delete product.dataValues.productColorId;
                delete product.dataValues.productSizeId;
              })
              return res.json({
                count: products.length,
                countByCategory,
                data: products
              })
            })    
        },

        show: (req, res) => {
          DB.Product
          .findByPk(req.params.id)
          .then(product => {
            product.dataValues.productMainImage = `http://localhost:3000/images/products/${product.productMainImage}`
              
            return res.status(200).json({
              data: product,
              status: 200
            })
          })
        }
      }
