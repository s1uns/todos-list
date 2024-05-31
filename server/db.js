const mysql = require("mysql");

const checkDbConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
});

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "todolist",
});

const makeRequest = (query) => {
    checkDbConnection.connect(function (err) {
        if (err) throw err;
        checkDbConnection.query(
            "CREATE DATABASE IF NOT EXISTS todolist",
            function (err, result) {
                if (err) throw err;
                console.log("Database created");
            },
        );
    });

    connection.connect();

    connection.query(query, (err, rows, fields) => {
        if (err) console.log("Error occured: ", err.message);
    });

    connection.end();
};

module.exports = {
    makeRequest,
};
