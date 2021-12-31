export default (sequelize, DataTypes) => {
    const Groups = sequelize.define(
        "Groups",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            tableName: "customer_groups",
        }
    );
    Groups.associate = function (models) {
        models.Groups.hasMany(models.Customers, { foreignKey: 'group_id', as: 'Customers' });
    };

    return Groups;
};