module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNUll: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNUll: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNUll: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    }, {timestamps: false});
};