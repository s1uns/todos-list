const { makeRequest } = require("../db");
const migrations = require("./migrations.json");

const migrate = () => {
    const queries = Object.values(migrations);


    for (let index in queries) {
        makeRequest(queries[index]);
    }

    console.log("All migrations successfully applied!");
};

module.exports = {
    migrate,
};
