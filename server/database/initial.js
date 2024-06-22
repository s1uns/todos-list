import sequelize from "./models/index.js";
import { Sequelize } from "sequelize";
import { Users, Todos, Shared, HeardFrom } from "./models/relations.js";
import { logger } from "../middleware/winstonLoggingMiddleware.js";

const sequelizeToInitDb = new Sequelize(
    "",
    process.env.DATABASE_USERNAME,
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
        logger.error(e);
    }
    return res;
}

async function initDatabase() {
    try {
        await createDatabase("todolist");
        logger.info("Initiated the db");
        await sequelize.sync({ force: true });
        logger.info(
            "All migrations applied successfully, connection has established.",
        ),
            process.exit(0);
    } catch (error) {
        logger.error("Couldn't initiate the database: ", error);
        process.exit(1);
    }
}

initDatabase();
