import { sha256 } from "js-sha256";
import { v4 as uuid } from "uuid";
import User from "../../database/models/user.js";
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

    const createdUser = await User.create({
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

    const userInfo = {
        userId: createdUser.id,
        email: createdUser.email,
        username: createdUser.createdUsername,
        fullName: `${createdUser.firstName} ${createdUser.lastName}`,
        birthDate: createdUser.birthDate,
        gender: createdUser.gender,
        country: createdUser.country,
        city: createdUser.city,
        // heardFrom: createdUser.heardFrom,
    };

    return userInfo;
};

export default registerUser;
