import { Sequelize, DataTypes }from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");

const Todo = sequelize.define(
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
        isCompleted: DataTypes.BOOLEAN,
        isUpdated: DataTypes.BOOLEAN,
    },
    {
        tableName: "todos",
        modelName: "Todo",
    },
);

export default Todo
