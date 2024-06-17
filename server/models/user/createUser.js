import { makeRequest } from "../../db.js";

const createUser = async ({
    id,
    email,
    firstName,
    lastName,
    username,
    birthDate,
    gender,
    country,
    city,
    heardFrom,
    password,
}) => {
    await makeRequest(
        `INSERT INTO users (id, email, username, firstName, lastName, birthDate, gender, country, city, password) VALUES ('${id}', '${email}', '${username}', '${firstName}', '${lastName}', '${birthDate}', '${gender}', '${country}', '${city}', '${password}');`,
    );

    heardFrom.map(
        async (heardFrom) =>
            await makeRequest(
                `INSERT INTO userheardfrom (userId, value) VALUES ('${id}', ${heardFrom});`,
            ),
    );
};

export default createUser;
