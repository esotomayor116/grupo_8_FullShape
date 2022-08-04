module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('Product', {
        productId: { type: DataTypes.INTEGER },
        productName: { type: DataTypes.STRING(100)},
        productDescription: { type: DataTypes.TEXT },
        productMainImage: { type: DataTypes.TEXT },
        productStatus: { type: DataTypes.STRING(50) },
        productCode: { type: DataTypes.STRING(50) },
        productCategory: { type: DataTypes.STRING(50) },
        productColor: { type: DataTypes.STRING(50) },
        productSize: { type: DataTypes.STRING(50) },
        productUnitPrice: { type: DataTypes.INTEGER },
    }, {
        tableName: 'products',
        timestamps: false
    });

    return Product;
}

