import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "secret";

const prisma = new PrismaClient();   

export const addToInbox = async (req, res) => {

}

/*
req includes:
     an array of userIDs or one userID
     a message.
     the type of the inbox
     the senderID or in cases where there is no sender it will simply show system
     
*/
export const getInbox = async (req, res) => {

 const { recievers, senderId, message, type } = req.body;

 try{
    if (!recievers || recievers.length === 0) {
        return res.status(400).json({ message: "Recievers are required" });
    }
    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }
    if (!type) {
        return res.status(400).json({ message: "Type is required" });
    }
    if (typeof senderId !== "string") {
        return res.status(400).json({ message: "Sender ID must be a string" });
    }
    for (let i = 0; i < recievers.length; i++) {
        const recieverId = recievers[i];
        const inbox = await prisma.inbox.create({
            data: {
                senderId: senderId,
                recieverId: recieverId,
                message: message,
                type: type,
            },
        });
    }
    res.status(200).json({ message: "Inbox created successfully" });
 }catch (error) {
    console.error("Error creating inbox:", error);
    res.status(500).json({ message: "Internal server error" });
  }
    
}

export const getUserInbox = async (req, res) => {
    const userId = req.userId
    try {
        const inbox = await prisma.inbox.findMany({
            where: {
                recieverId: userId,
            },
        });
        res.status(200).json(inbox);
    } catch (error) {
        console.error("Error fetching inbox:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}