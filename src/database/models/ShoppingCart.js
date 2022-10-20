module.exports = (sequelize, DataTypes) => {

   const ShoppingCart =  sequelize.define('ShoppingCart', {
       shoppingCartId: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
       CartNumberOfItems: {type: DataTypes.INTEGER},
       CartTotalPrice: {type: DataTypes.DECIMAL(10,2)}    
   }, {
        tableName: 'shoppingcart',
        timestamps: false
   });
   
   ShoppingCart.associate = function(models) {
        ShoppingCart.belongsToMany(models.Product, {
            as: 'products',
            through: 'ProductCart',
            foreignKey: 'shoppingCartId',
            otherKey: 'productId',
            timestamps: false
        }),
        ShoppingCart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
   }

   return ShoppingCart;
}