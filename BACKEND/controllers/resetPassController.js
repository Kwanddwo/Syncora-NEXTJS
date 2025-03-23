import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
const prisma=new PrismaClient();
dotenv.config();
const SECRET = process.env.JWT_SECRET || "secret";


export const ResetPass = async (req, res) => {
    const { email } = req.body;

    const user = await prisma.users.findUnique({where :{ email }});
    if (!user) {
        return res.status(400).send('User not found');
    }

    const resetToken = jwt.sign({ email: user.email }, SECRET, {
        expiresIn: '1h', 
    });

    res.json({
        message: 'Password reset token generated.',
        token: resetToken,
    });
};

export const ResetPassword = async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: "Token and password are required." });
    }

    try {
        const decoded = jwt.verify(token, SECRET);

        const user = await prisma.users.findUnique({ where: { email: decoded.email } });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.update({
            where: { email: decoded.email },
            data: { password: hashedPassword },
        });

        res.json({ message: "Password reset successfully!" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(400).json({ message: "Invalid or expired token." });
    }
};