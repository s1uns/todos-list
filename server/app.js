import migrate from "./migrations/migrationsManager";

const express = require("express");

migrate();

const app = express();

const port = 5000;

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
