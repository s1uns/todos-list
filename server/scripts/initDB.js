const { makeRequest } = require("../db");
const initialMigrations = require("../migrations/initialMigrations.json");
const mysql = require("mysql");

const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
};

const initialPool = mysql.createPool(dbConfig);

const createDB = async (query) => {
    return new Promise((resolve, reject) => {
        initialPool.query(query, (err, rows, fields) => {
            if (err) reject("Error occured: ", err);
            resolve(rows);
        });
    });
};

async function initDB() {
    const queries = Object.values(initialMigrations);

    Promise.all(queries.map((query) => makeRequest(query)))
        .then(() => {
            console.log("The database tables are successfully initialized!");
            process.exit(0);
        })
        .catch((err) => {
            console.error("Error:", err);
            process.exit(1);
        });
}

createDB("CREATE DATABASE IF NOT EXISTS todolist;")
    .then(() => {
        initDB();
    })
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });
