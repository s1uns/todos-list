import { sha256 } from "js-sha256";
import { v4 as uuid } from "uuid";
import { createUser } from "../../models/user/index.js";

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

    await createUser(user);

    const userInfo = {
        userId: user.id,
        email: user.email,
        username: user.username,
        fullName: `${user.firstName} ${user.lastName}`,
        birthDate: user.birthDate,
        gender: user.gender,
        country: user.country,
        city: user.city,
        heardFrom: user.heardFrom,
    };

    return userInfo;
};

export default registerUser;
