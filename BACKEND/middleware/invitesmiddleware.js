import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
export const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "secret";
// used with the accept and reject invite routes
export const verifyInvite = async (req, res, next) => {

    const { inviteId } = req.body;
    try {
        const invite = await prisma.workspaceInvite.findUnique({
            where: {
                id: inviteId,
            },
        });
        if (!invite) {
            return res.status(404).json({ message: "Invite not found" });
        }
        console.log("Invite verified successfully:");
        next();
    } catch (error) {
        console.error("Error verifying invite:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export const InviteAlreadyRespondedTo = async (req, res, next) => {
      
    const { inviteId } = req.body;
    try {
        const invite = await prisma.workspaceInvite.findUnique({
            where: {
                id: inviteId,
            },
        });    
        if (invite.status ==="accepted" ) {
            return res.status(400).json({ message: "This invite had been accepted" });
        }
        if (invite.status ==="declined") {
            return res.status(400).json({ message: "This invite had been declined" });
        }

        next();
    } catch (error) {
        console.error("Error checking invite status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//used with the createInvite route
// we need to check in this function if the invite already exists and has either been accepted or still pending
export const inviteAlreadyExists = async (req, res, next) => {
    const { workspaceId , invitedUserId} = req.body;
    try {
         const existingInvite = await prisma.workspaceInvite.findFirst({
            where: {
                workspaceId: workspaceId,
                invitedUserId: invitedUserId,
            },
         })
            if (existingInvite && existingInvite.status ==="accepted") {
                return res.status(400).json({ message: "You cannot invite a user that is already a member of the workspace"});
            }else if (existingInvite && existingInvite.status ==="pending") {
                return res.status(400).json({ message: "An invite was sent to the user and is still pending "});
            } else  {
                next();
            }
} catch (error) {
        console.error("Error checking invite status:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
// verify if the reciever exists
export const verifyReciever = async (req, res, next) => {
    const {invitedUserId} = req.body;
    console.log(invitedUserId)
    try {
        const reciever = await prisma.user.findUnique({
            where: {
                id: invitedUserId,
            },
        });
        if (!reciever) {
            return res.status(404).json({ message: "Reciever not found" });
        }
        console.log("Reciever verified successfully:");
        next();
    } catch (error) {
        console.error("Error verifying reciever:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}