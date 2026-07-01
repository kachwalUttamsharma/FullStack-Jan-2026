import jwt from "jsonwebtoken";

export function generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const expiry = process.env.JWT_EXPIRY;

    if(!secret || !expiry) {
        throw new Error("JWT_SECRET or JWT_EXPIRY is not defined in environment variables");
    }

    return jwt.sign(payload, secret, { expiresIn: expiry, algorithm: "HS256" });
}
