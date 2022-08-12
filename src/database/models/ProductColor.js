module.exports = (sequelize, DataTypes) => {
    
    const ProductColor =  sequelize.define('ProductColor', {
        colorId: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        colorName: {type: DataTypes.STRING(50)}
    }, {
         tableName: 'productColors',
         timestamps: false
    });
    
    ProductColor.associate = function(models) {
        ProductColor.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'productColorId'
        })
    }

    return ProductColor;
 }