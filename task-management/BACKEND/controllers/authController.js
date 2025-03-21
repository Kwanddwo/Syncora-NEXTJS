import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "secret";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) return res
        .status(404)
        .json({ message: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt
    .sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
    res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
}

export const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.users.create({
            data: { name, email, password: hashedPassword },
        });
        res
        .json({ message: "User registered successfully" });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error creating user" });
    }
}