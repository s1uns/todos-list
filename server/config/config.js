require("dotenv").config(); // this is important!

module.exports = {
    development: {
        host: process.env.DATABASE_HOST,
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        database: "todolist_dev",
        dialect: "mysql",
    },
    test: {
        host: process.env.DATABASE_HOST,
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        database: "todolist_test",
        dialect: "mysql",
    },
    production: {
        host: process.env.DATABASE_HOST,
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        database: "todolist_prod",
        dialect: "mysql",
    },
};
