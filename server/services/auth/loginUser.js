import { sha256 } from "js-sha256";
import Users from "../../database/models/Users.js";

const loginUser = async (email, password) => {
    const passwordHash = sha256(password);

    const user = await Users.findOne({ email: email, password: passwordHash });

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
