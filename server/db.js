import mysql from "mysql";
import dbConfig from "./dbConfig.js";

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

export { makeRequest };
