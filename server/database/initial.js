import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./models/index.js";
import Shared from "./models/Shared.js";
import Todo from "./models/todo.js";
import User from "./models/user.js";

const sequelizeToInitDb = new Sequelize(
    "",
    "root",
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        logging: console.log,
    },
);

async function createDatabase(dbName) {
    let res;
    try {
        res = await sequelizeToInitDb
            .getQueryInterface()
            .createDatabase(dbName);
    } catch (e) {
        console.log(e);
    }
    return res;
}

async function initDatabase() {
    try {
        await createDatabase("todolist");
        console.log("Initiated the db");
        await sequelize.sync({ force: true });
        console.log(
            "All migrations applied successfully, connection has established.",
        );

        process.exit(0);
    } catch (error) {
        console.log("Couldn't initiate the database: ", error);
        process.exit(1);
    }
}

User.hasMany(Todo, { as: "todos", foreignKey: "creatorId" });

Todo.belongsTo(User, { as: "creator", foreignKey: "creatorId" });

// Shared.belongsTo(User, { foreignKey: "ownerId" });
// Shared.belongsTo(User, { foreignKey: "sharedWithId" });

initDatabase();
