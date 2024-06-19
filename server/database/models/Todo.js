import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Todo = sequelize.define(
    "Todo",
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
    },
    {
        tableName: "todos",
        modelName: "Todo",
    },
);

export default Todo;
