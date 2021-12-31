export default (sequelize, DataTypes) => {
    const Customers = sequelize.define(
        "Customers",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            company_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            vat_number: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: false,
            },
            phone_number: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: false,
            },
            website: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zip_code: DataTypes.STRING,
            country_id: DataTypes.INTEGER,
            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            currency_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            language_default: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            tableName: "customers",
        }
    );

    Customers.associate = function (models) {
        models.Customers.belongsTo(models.Groups, { foreignKey: 'id' });
    };

    return Customers;
};