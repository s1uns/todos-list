import { makeRequest } from "../../db.js";

const getUser = async (email, passwordHash) =>
    JSON.parse(
        JSON.stringify(
            await makeRequest(
                `SELECT * FROM users WHERE email = '${email}' AND password = '${passwordHash}';`,
            ),
        ),
    )[0];

export default getUser;
