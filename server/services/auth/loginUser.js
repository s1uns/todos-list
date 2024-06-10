import { sha256 } from "js-sha256";
import { getUser } from "../../models/index.js";

const loginUser = async (email, password) => {
    console.log("Password: ", password);

    const passwordHash = sha256(password);

    const user = await getUser(email, passwordHash);
    console.log("User: ", user);

    if (!user) {
        return null;
    }

    const userInfo = {
        userId: user.id,
        email: user.email,
        username: user.username,
        fullName: `${user.firstName} ${user.lastName}`,
    };

    return userInfo;
};

export default loginUser;
