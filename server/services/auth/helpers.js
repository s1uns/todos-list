import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

const generateToken = async (user) => jwt.sign({ user }, secretKey);

export { generateToken };
