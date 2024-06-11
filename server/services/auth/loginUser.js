import { sha256 } from "js-sha256";
import { getUser } from "../../models/user/index.js";

const loginUser = async (email, password) => {
    const passwordHash = sha256(password);

    const user = await getUser(email, passwordHash);

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
