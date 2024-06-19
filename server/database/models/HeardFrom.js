import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./Users.js";

const HeardFrom = sequelize.define(
    "HeardFrom",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        value: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                notNull: {
                    msg: "The value is required.",
                },
            },
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "heardFrom",
        modelName: "HeardFrom",
    },
);

export default HeardFrom;
