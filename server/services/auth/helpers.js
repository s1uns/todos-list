import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;
const accessExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;

const generateToken = async (user, expiresIn) =>
    jwt.sign({ user }, secretKey, { expiresIn: expiresIn });

const generateAccessToken = async (user) =>
    await generateToken(user, accessExpiresIn);

const generateRefreshToken = async (user) =>
    await generateToken(user, refreshExpiresIn);

export { generateAccessToken, generateRefreshToken };
