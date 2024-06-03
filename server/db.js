const mysql = require("mysql");
const dbConfig = require("./dbConfig");

const checkDbConnection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
});

const connection = mysql.createPool(dbConfig);

const makeRequest = (query) => {
    checkDbConnection.query(
        "CREATE DATABASE IF NOT EXISTS todolist",
        function (err, result) {
            if (err) throw err;
            console.log("Database created");
        },
    );

    connection.query(query, (err, rows, fields) => {
        if (err) console.log("Error occured: ", err.message);
    });
};

module.exports = {
    makeRequest,
};
