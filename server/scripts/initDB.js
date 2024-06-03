const { makeRequest } = require("../db");
const initialMigrations = require("../migrations/initialMigrations.json");

async function initDB() {
    const queries = Object.values(initialMigrations);

    for (let index in queries) {
        await makeRequest(queries[index]);
    }

    console.log("The database tables are successfully initialized!");
}

initDB()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });
