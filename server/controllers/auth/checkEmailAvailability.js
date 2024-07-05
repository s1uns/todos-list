import Users from "../../database/models/Users.js";

const checkEmailAvailability = async (req, res) => {
	console.log("Req body: ", req.body);
	const { email } = req.body;

	const user = await Users.findOne({
		where: { email: email },
	});

	if (!user) {
		return res.success(true);
	}

	return res.success(false);
};

export default checkEmailAvailability;
