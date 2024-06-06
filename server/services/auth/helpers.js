import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN

const generateToken = async (user) =>
    jwt.sign({ user }, secretKey, { expiresIn: expiresIn });

export { generateToken };
