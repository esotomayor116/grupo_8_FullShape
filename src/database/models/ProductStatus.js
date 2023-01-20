module.exports = (sequelize, DataTypes) => {
    
    const ProductStatus =  sequelize.define('ProductStatus', {
        statusId: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        statusName: {type: DataTypes.STRING(50)},
    }, {
         tableName: 'productstatus',
         timestamps: false
    });
    
    ProductStatus.associate = function(models) {
        ProductStatus.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'productStatusId'
        })
    }

    return ProductStatus;
 }