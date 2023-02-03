const DB = require('../../database/models')
const Op = DB.Sequelize.Op;

module.exports = {
  list: (req, res) => {
      const categories = DB.ProductCategory.findAll({include: 'products'})
      const products = DB.Product.findAll({include: ['status','category', 'color', 'size', ] })
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
            return res.status(200).json({
              count: products.length,
              countByCategory,
              data: products,
              status: 200
            })
          })    
      },

    show: (req, res) => {
        DB.Product
        .findByPk(req.params.id, {include: ['status','category', 'color', 'size', ] })
        .then(product => {
          product.dataValues.productMainImage = `http://localhost:3000/images/products/${product.productMainImage}`
          delete product.dataValues.productStatusId;
          delete product.dataValues.productCategoryId;
          delete product.dataValues.productColorId;
          delete product.dataValues.productSizeId;  
          return res.status(200).json({
            data: product,
            status: 200
          })
        })
    },
    store: async (req, res) => {
      product = await DB.Product.create(req.body);
      return res.status(200).json({
        data: product,
        created: 'success'
      })
    },
    update: async (req, res) => {
      id = req.params.id;
      updatedProduct = await DB.Product.update(req.body, {
        where: { 
          productId: id 
        }
      });
      return res.status(200).json({
        data: updatedProduct,
        updated: 'success'
      })
    },
    delete: async (req, res) => {
      const id = req.params.id;
      const deletedProduct = await DB.Product.destroy({where: { productId: id }});
      return res.status(200).json({
        data: deletedProduct,
        deleted: 'success'
      })
    },
    search: async (req, res) => {
      const search = await DB.Product.findAll({
        where: {
          productName: { [Op.like]: `%${req.query.productname}%` }
        }
      });
      if (search.length > 0) {
        return res.status(200).json({
          data: search,
          completed: 'success'
        });
      } else {
        return res.status(404).json(
          "There are no products related to your search!"
        );
      }
    }
}
