import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "todolist",
    "root",
    process.env.DATABASE_PASSWORD,
    { host: process.env.DATABASE_HOST, dialect: "mysql" },
);

export default sequelize;
