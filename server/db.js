const mysql = require("mysql");
const dbConfig = require("./dbConfig");

const connection = mysql.createPool(dbConfig);
const makeRequest = (query) => {
    connection.query(query, (err, rows, fields) => {
        console.log("Running the query: ", query);

        if (err) console.log("Error occured: ", err.message);
    });
};

module.exports = {
    makeRequest,
};
