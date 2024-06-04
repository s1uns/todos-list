const mysql = require("mysql");
const dbConfig = require("./dbConfig");

const connection = mysql.createPool(dbConfig);
const makeRequest = async (query) => {
    // console.log("Query: ", query);

    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = {
    makeRequest,
};
