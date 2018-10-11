module.exports = (sequelize, DateTypes) => {
    return sequelize.define('comment', {
        comment: {
            type: DateTypes.STRING(100),
            allowNUll: false,
        },
        created_at: {
            type: DateTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        }
    }, {timestamps: false});
};