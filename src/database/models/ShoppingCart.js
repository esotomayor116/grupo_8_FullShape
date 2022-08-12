module.exports = (sequelize, DataTypes) => {

   const ShoppingCart =  sequelize.define('ShoppingCart', {
       shoppingCartId: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
       cartNumberOfItems: {type: DataTypes.INTEGER},
       cartTotalPrice: {type: DataTypes.STRING(10,2)}    
   }, {
        tableName: 'shopping_carts',
        timestamps: false
   });
   
   ShoppingCart.associate = function(models) {
        ShoppingCart.belongsToMany(models.Product, {
            as: 'products',
            through: 'productCart',
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