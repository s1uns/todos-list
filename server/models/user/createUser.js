import { makeRequest } from "../../db.js";

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

export default createUser;
