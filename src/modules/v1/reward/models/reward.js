export default (sequelize, DataTypes) => {
    const Rewards = sequelize.define(
        "Rewards",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            walletID: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            rewardAmount: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            rewardWithdrawn: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            rewardAvailable: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            rewardType: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            tableName: "rewards"
        }
    );

    return Rewards;
}