module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('Product', {
        productId: { type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true },
        productName: { type: DataTypes.STRING(100)},
        productDescription: { type: DataTypes.TEXT },
        productMainImage: { type: DataTypes.TEXT },
        productCode: { type: DataTypes.STRING(50) },
        productUnitPrice: { type: DataTypes.DECIMAL(10,2) }
    }, {
        tableName: 'products',
        timestamps: false
    });

    Product.associate = function(models) {
        Product.belongsTo(models.ProductStatus, {
            as: 'status',
            foreignKey: 'productStatusId'
        }),
        Product.belongsTo(models.ProductCategory, {
            as: 'categories',
            foreignKey: 'productCategoryId'
        }),
        Product.belongsTo(models.ProductColor, {
            as: 'colors',
            foreignKey: 'productColorId'
        }),
        Product.belongsTo(models.ProductSize, {
            as: 'sizes',
            foreignKey: 'productSizeId'
        }),
        Product.belongsToMany(models.ShoppingCart , {
            as: 'shoppingCarts',
            through: 'ProductCart',
            foreignKey: 'productId',
            otherKey: 'shoppingCartId',
            timestamps: false
        })
    }

    return Product;
}

