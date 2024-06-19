import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import Users from "./Users.js";

const Todos = sequelize.define(
    "Todos",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: "The title is required.",
                },
                notEmpty: {
                    msg: "The title should not be empty",
                },
            },
        },
        isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
        isUpdated: { type: DataTypes.BOOLEAN, defaultValue: false },
        creatorId: {
            type: DataTypes.UUID,
            references: {
                model: Users,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "todos",
        modelName: "Todos",
    },
);

export default Todos;
