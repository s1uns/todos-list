const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "todolist",
});


const makeRequest = (query) => {
    connection.connect();

    connection.query(query, (err, rows, fields) => {
        if (err) console.log("Error occured: ", err.message);
    });

    connection.end();
};

module.exports = {
    makeRequest,
};
