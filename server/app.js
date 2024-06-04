const { migrate } = require("./migrations/migrationsManager.js");
const { userRoutes } = require("./routes/userRoutes/userRoutes.js");
const { todosRoutes } = require("./routes/todosRoutes/todosRoutes.js");
const { authRoutes } = require("./routes/authRoutes/authRoutes.js");

const express = require("express");

migrate();

const app = express();

const port = 5000;

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRoutes);
app.use("/todos", todosRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
