import { makeRequest } from "../../db.js";

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

export default userExists;
