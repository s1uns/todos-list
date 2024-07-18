import Users from "../../database/models/Users.js";
import {
	CREDENTIAL_EMAIL,
	CREDENTIAL_USERNAME,
} from "../../utils/constants/credentialType.js";

const checkCredentialAvailability = async (req, res) => {
	const { credential, credentialType } = req.body;
	const whereStatement = {};

	if (credentialType === CREDENTIAL_EMAIL) {
		whereStatement.email = credential;
	}

	if (credentialType === CREDENTIAL_USERNAME) {
		whereStatement.username = credential;
	}

	const user = await Users.findOne({
		where: whereStatement,
	});

	if (!user) {
		return res.success(true);
	}

	return res.success(false);
};

export default checkCredentialAvailability;
