module.exports = (sequelize, DataTypes) => {
    
    const ProductSize =  sequelize.define('ProductSize', {
        sizeId: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        sizeName: {type: DataTypes.STRING(50)},
    }, {
         tableName: 'productSizes',
         timestamps: false
    });
    
    ProductSize.associate = function(models) {
        ProductSize.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'productSizeId'
        })
    }

    return ProductSize;
 }
