const makeRequest = require("../db");
const migrations = require("./migrations.json");

const migrate = () => {
    const queries = JSON.parse(migrations);

    for (let query in queries) {
        makeRequest(query);
    }

    console.log("All migrations successfully applied!");
};

module.exports = () => {
    migrate;
};
