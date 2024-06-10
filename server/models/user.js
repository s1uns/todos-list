import { makeRequest } from "../db.js";

const createUser = async ({
    id,
    email,
    firstName,
    lastName,
    username,
    password,
}) =>
    await makeRequest(
        `INSERT INTO users (id, email, firstName, lastName , username, password) VALUES ('${id}', '${email}', '${firstName}', '${lastName}', '${username}', '${password}');`,
    );

const userExists = async (email) =>
    Object.values(
        Object.values(
            JSON.parse(
                JSON.stringify(
                    await makeRequest(
                        `SELECT COUNT(*) FROM users WHERE email = '${email}';`,
                    ),
                ),
            )[0],
        ),
    )[0];

const getUser = async (email, passwordHash) =>
    JSON.parse(
        JSON.stringify(
            await makeRequest(
                `SELECT * FROM users WHERE email = '${email}' AND password = '${passwordHash}';`,
            ),
        ),
    )[0];

export { createUser, userExists, getUser };
