import { DataTypes } from "sequelize";
import sequelize from "./index.js";

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
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: "shared",
        modelName: "Shared",
    },
);

export default Shared;
