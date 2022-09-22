const DB = require('../../database/models')

module.exports = {
    list: (req, res) => {
        DB.Product.findAll()
          .then(products => {
            // ESTO ES PARA MOSTRAR EL CONTEO POR CATEGORÍA.
            const gimnasio = products.filter(product => product.productCategoryId == 1 )
            const futbol = products.filter(product => product.productCategoryId == 2 )
            const kinesiologia = products.filter(product => product.productCategoryId == 3 )
            const suplementos = products.filter(product => product.productCategoryId == 4 )
            const boxeo = products.filter(product => product.productCategoryId == 5 )
            // ESTO ES PARA INCLUIR EL URL PARA DETALLE DEL PRODUCTO.
            products.map(product => {
              product.dataValues.productDetail = `http://localhost:3000/productsapi/${product.productId}`
              })
            // ESTO ES SOLO PARA MOSTRAR EL NOMBRE DE LAS CATEGORÍAS, COLORES, ETC... SEGÚN SU ID, NO ES ESENCIAL.  
            const ProductCategories = DB.ProductCategory.findAll()
            const ProductColors = DB.ProductColor.findAll()
            const ProductSizes = DB.ProductSize.findAll()
            const ProductStatus = DB.ProductStatus.findAll()
            Promise.all([ProductCategories, ProductColors, ProductSizes, ProductStatus])
            .then(([categories, colors, sizes, statusx ]) => {
              products.map(product => {
                const category = categories.filter(category => category.categoryId == product.productCategoryId);
                const color = colors.filter(color => color.colorId == product.productColorId);
                const size = sizes.filter(size => size.sizeId == product.productSizeId);
                const status = statusx.filter(status => status.statusId == product.productStatusId);
                product.dataValues.productCategoryId += ` (${category[0].dataValues.categoryName})`
                if (size != '') {
                  product.dataValues.productSizeId += ` (${size[0].dataValues.sizeName})`
                }
                if (color != '') {
                  product.dataValues.productColorId += ` (${color[0].dataValues.colorName})`
                }
                product.dataValues.productStatusId += ` (${status[0].dataValues.statusName})`
              })
              // ESTA ES LA RESPUESTA FINAL, DE LA PROMESA INICIAL
              return res.json({
                count: products.length,
                countByCategory: {
                  "Gimnasio": gimnasio.length,
                  "Fútbol": futbol.length,
                  "Kineseología": kinesiologia.length,
                  "Sumplementos": suplementos.length,
                  "Boxeo": boxeo.length
                },
                data: products
              })
            })
           
              
          })
        }
      }
