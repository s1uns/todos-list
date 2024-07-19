import Users from "../../database/models/Users.js";

const getUser = async (userId) => {
	const user = await Users.findOne({
		where: {
			id: userId,
		},
		attributes: ["id", "username", "firstName", "lastName", "fullName"],
	});

	return {
		userId: user.id,
		fullName: user.fullName,
		username: user.username,
	};
};

export default getUser;
