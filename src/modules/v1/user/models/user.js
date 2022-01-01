export default (sequelize, DataTypes) => {
    const Members = sequelize.define(
        "Members",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nonce: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            publicAddress: {
                type: DataTypes.STRING,
                unique: true
            },
            username: {
                type: DataTypes.STRING
            },
            token: {
                type: DataTypes.STRING
            },
            is_active: { type: DataTypes.BOOLEAN, field: "is_active" }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            tableName: "users"
        }
    );

    Members.associate = function (models) {
        // models.Members.belongsTo(models.Roles, { foreignKey: 'id' });
    };

    return Members;
};
