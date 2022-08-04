module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        userId: { type: DataTypes.INTEGER },
        userNames: { type: DataTypes.STRING(50)},
        userLastNames: { type: DataTypes.STRING(50) },
        userPhone: { type: DataTypes.STRING(25) },
        userEmail: { type: DataTypes.STRING(100) },
        userReceiveOffersAndNews: { type: DataTypes.BOOLEAN },
        userCategory: { type: DataTypes.STRING(50) },
        userPassword: { type: DataTypes.STRING(100) },
        userImage: { type: DataTypes.TEXT }
    }, {
        tableName: 'users',
        timestamps: false
    });

    return User;
}