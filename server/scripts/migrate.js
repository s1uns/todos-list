import { makeRequest } from "../db.js";
import migrations from "../migrations/migrations.json" with { type: "json" };

const mirgationExists = async (migrationName) => {
    const exists = await makeRequest(
        `SELECT COUNT(*) FROM migrations WHERE migrationName = '${migrationName}';`,
    );

    return Object.values(
        Object.values(JSON.parse(JSON.stringify(exists))[0]),
    )[0];
};

async function migrate() {
    const queries = Object.values(migrations);
    console.log("Initializing the migration process...");

    // return Promise.all(
    //     queries.map(async (query) => {
    //         const migrationName = Object.keys(migrations).find(
    //             (key) => migrations[key] === query,
    //         );
    //         const exists = await mirgationExists(migrationName);

    //         console.log(
    //             `${migrationName} ${exists ? "exists" : "doesn't exist"}`,
    //         );

    //         if (!exists) {
    //             await makeRequest(
    //                 `INSERT INTO migrations (migrationName) VALUES ('${migrationName}');`,
    //             );
    //             await makeRequest(query);
    //         }
    //     }),
    // );
}

migrate()
    .then(() => {
        console.log("All migrations were successfully applied");
        process.exit(0);
    })
    .catch((err) => {
        console.error("There was an error during migration process:", err);
        process.exit(1);
    });
