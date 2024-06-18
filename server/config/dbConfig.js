import { Sequelize } from "sequelize";

console.log("Password: ", process.env.DATABASE_PASSWORD);

const sequelize = new Sequelize(
    "todolist",
    "root",
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        logging: console.log,
    },
);

export default sequelize;
