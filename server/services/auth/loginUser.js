import { sha256 } from "js-sha256";
import Users from "../../database/models/Users.js";

const loginUser = async (email, password) => {
    const passwordHash = sha256(password);

    console.log("Email: ", email);
    console.log("Password: ", password);

    const user = await Users.findOne({
        where: { email: email, password: passwordHash },
    });

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
