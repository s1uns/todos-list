const { makeRequest } = require("../db");
const migrations = require("../migrations/migrations.json");

async function migrate() {
    const queries = Object.values(migrations);

    for (let index in queries) {
        await makeRequest(queries[index]);
    }

    console.log("All migrations are successfully applied!");

    process.exit(0);
}


migrate()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });
