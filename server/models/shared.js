const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Shared = sequelize.define(
    "Shared",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        status: {
            allowNull: false,
            type: DataTypes.UUID,
        },
    },
    {
        sequelize,
        tableName: "shared",
        modelName: "Shared",
    },
);

Shared.belongsTo(sequelize.models.User, { as: "ownerId" });
Shared.belongsTo(sequelize.models.User, { as: "sharedWithId" });

module.exports(Shared);
