module.exports = (sequelize, DataTypes) => {
    
    const ProductCategory =  sequelize.define('ProductCategory', {
        categoryId: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        categoryName: {type: DataTypes.STRING(50)}
    }, {
         tableName: 'productCategories',
         timestamps: false
    });
    
    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'productCategoryId'
        })
    }

    return ProductCategory;
 }