module.exports = (sequelize, DataTypes) => {

    const ProductCart =  sequelize.define('ProductCart', {}, {
         tableName: 'productcart',
         timestamps: false
    });
    
    return ProductCart;
}

