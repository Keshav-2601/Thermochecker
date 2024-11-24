import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function jsonAuthentication_Authorization(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized: Token is missing");
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).send("You are not an Admin");
        }
        const isPasswordValid = await bcrypt.compare(process.env.ADMIN_PASSWORD, decoded.password);
        if (!isPasswordValid) {
            return res.status(403).send("Invalid Admin Credentials");
        }
        req.user = decoded;

        next();
    } catch (error) {
        console.error("Error happened in Token decoding:", error);
        return res.status(403).send("Unauthorized Token");
    }
}
