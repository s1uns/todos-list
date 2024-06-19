import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "todolist",
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        logging: console.log,
    },
);

export default sequelize;
