import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { addMemberToWorkspace } from "./workspacehandler.js";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "secret";


const prisma = new PrismaClient();

export const CreateInvite = async (req, res) => {
  const inviteSenderId = req.userId; 
    const {workspaceId,invitedUserId,inviteSenderEmail} = req.body;
  
    try {
     
      if (inviteSenderId === invitedUserId) {
        return res.status(400).json({ message: "You cannot invite yourself." });
      }
      const invite = await prisma.workspaceInvite.create({
        data: {
          inviteSenderId: inviteSenderId,  
          invitedUserId: invitedUserId,   
          workspaceId: workspaceId,       
          status: "pending"
        }
      });
      const inboxEntry = await prisma.inbox.create({
        data: {
          userId: invitedUserId,
          senderId: inviteSenderId,
          type: "workspace_invite",
          details: {
            inviteId: invite.id,
            
          },
          message: `${inviteSenderEmail} invited you to join  his workspace .`,
        },
      });
      res.status(201).json({
        message: "Invite sent successfully."
      });
    } catch (error) {
      console.error("Error creating invite:", error);
      res.status(500).json({ message: "Failed to send invite." });
    }
  };
export const AcceptInvite = async (req, res) => {
  const memberId = req.userId;
  const {inviteId}  = req.body;
  try {
    // dont forget to add middlewares after this!
    const invite= await prisma.workspaceInvite.update({
      where: {
        id: inviteId,
      },
      data: {
        status: "accepted",
      },
    }); 
    if (invite.status === "accepted") {
      req.body.memberId = memberId; // Add memberId to the request body
      req.body.workspaceId = invite.workspaceId; // Add workspaceId to the request body
      req.body.role = "member"; // Add role to the request body
    }
    let inviteaccept="Invite accepted successfully."
    req.AcceptInvite=inviteaccept; // Add a message to the request object
    addMemberToWorkspace(req, res); // Call the function to add the member to the workspace
  
  } catch (error) {
    console.error("Error accepting invite:", error);
    res.status(500).json({ message: "Failed to accept invite." });
    
  }
 }
export const DeclineInvite = async (req, res) => {
  const invitedUserId = req.body.userId;
  const { inviteId } = req.body;
  try {
    // Update the invite status to "declined"
    await prisma.workspaceInvite.update({
      where: { id: inviteId },
      data: { status: "declined" },
    });
    res.status(200).json({ message: "Invite declined successfully." });
  } catch (error) {
    console.error("Error declining invite:", error);
    res.status(500).json({ message: "Failed to decline invite." });
  }
}
export const GetInviteByIdFromInbox = async (req, res) => {
  const inviteId = req.details.inviteId; // get the fucking  invite ID from the request body
  try {
    const invite = await prisma.workspaceInvite.findUnique({
      where: {
        id: inviteId,
      },
    }); 
    if (!invite) {
      return res.status(404).json({ message: "Invite not found." });
    }
    res.status(200).json(invite);

  } catch (error) {
    console.error("Error fetching invite by ID:", error);
    res.status(500).json({ message: "Failed to fetch invite." });
    
  }
}
export const GetUserInvites = async (req, res) => {} // will be useful if we decide to create an inbox filter




