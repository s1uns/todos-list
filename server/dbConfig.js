module.exports = {
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "todolist",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};
