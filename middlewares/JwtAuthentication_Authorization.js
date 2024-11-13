import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
export async function jsonAuthentication_Authorization(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        if (req.user.email === "Keshavv857@gmail.com") {
            const isAdmin = await bcrypt.compare("KeshavVerma@26", req.user.password);
            if (isAdmin) {
                return res.status(200).send("Admin is logged in!");
            } else {
                return res.status(403).send("You are not an Admin");
            }
        }

        return res.status(403).send("You are not an Admin");
    } catch (error) {
        console.log("Error happened in Token decoding:", error);
        return res.status(403).send("Unauthorized Token");
    }
}