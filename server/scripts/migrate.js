const { makeRequest } = require("../db");
const migrations = require("../migrations/migrations.json");

const mirgationExists = async (migrationName) => {
    return new Promise((resolve, reject) => {
        makeRequest(
            `SELECT COUNT(*) FROM migrations WHERE migrationName = '${migrationName}';`,
        )
            .then((rows) => {
                resolve(
                    Object.values(
                        Object.values(JSON.parse(JSON.stringify(rows))[0]),
                    )[0],
                );
            })
            .catch((err) => {
                reject(err);
            });
    });
};

async function migrate() {
    const queries = Object.values(migrations);
    console.log("Initializing the migration process...");
    return Promise.all(
        queries.map(async (query) => {
            const migrationName = Object.keys(migrations).find(
                (key) => migrations[key] === query,
            );
            const exists = await mirgationExists(migrationName);

            console.log(
                `${migrationName} ${exists ? "exists" : "doesn't exist"}`,
            );

            if (!exists) {
                await makeRequest(
                    `INSERT INTO migrations (migrationName) VALUES ('${migrationName}');`,
                );
                await makeRequest(query);
            }
        }),
    );
}

migrate()
    .then(() => {
        console.log("All migrations were successfully applied");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });
