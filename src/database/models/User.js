module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        userId: { type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true },
        userNames: { type: DataTypes.STRING(50)},
        userLastNames: { type: DataTypes.STRING(50) },
        userPhone: { type: DataTypes.STRING(25) },
        userEmail: { type: DataTypes.STRING(100) },
        userReceiveOffersAndNews: { type: DataTypes.BOOLEAN },
        userType: { type: DataTypes.STRING(50) },
        userPassword: { type: DataTypes.TEXT },
        userImage: { type: DataTypes.TEXT }
    }, {
        tableName: 'users',
        timestamps: false
    });

    User.associate = function(models) {
        User.hasOne(models.ShoppingCart, {
            as: 'shoppingCart',
            foreignKey: 'userId'
        })
    }

    return User;
}