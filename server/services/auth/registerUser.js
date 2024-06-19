import { sha256 } from "js-sha256";
import { v4 as uuid } from "uuid";
import Users from "../../database/models/Users.js";
import HeardFrom from "../../database/models/HeardFrom.js";

const registerUser = async (credentials) => {
    const passwordHash = sha256(credentials.password);

    const user = {
        id: uuid(),
        email: credentials.email,
        username: credentials.username,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        birthDate: credentials.birthDate,
        gender: credentials.gender,
        country: credentials.country,
        city: credentials.city,
        heardFrom: credentials.heardFrom,
        password: passwordHash,
    };

    const createdUser = await Users.create({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        birthDate: user.birthDate,
        gender: user.gender,
        country: user.country,
        city: user.city,
        password: user.password,
    });

    user.heardFrom.map(
        async (heardFrom) =>
            await HeardFrom.create({
                id: uuid(),
                userId: user.id,
                value: heardFrom,
            }),
    );

    const userInfo = {
        userId: createdUser.id,
        email: createdUser.email,
        username: createdUser.createdUsername,
        fullName: `${createdUser.firstName} ${createdUser.lastName}`,
        birthDate: createdUser.birthDate,
        gender: createdUser.gender,
        country: createdUser.country,
        city: createdUser.city,
    };

    return userInfo;
};

export default registerUser;
