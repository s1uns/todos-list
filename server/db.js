import mysql from "mysql";
import dbConfig from "./config/dbConfig.js";

const connection = mysql.createPool(dbConfig);
const makeRequest = async (query) => {

    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

export { makeRequest };
