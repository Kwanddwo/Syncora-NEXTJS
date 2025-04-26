import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "secret";


const prisma = new PrismaClient();


/*
req includes:
     an array of userIDs or one userID
     a message.
     the type of the inbox
     the senderID or in cases where there is no sender it will simply show system
     
*/
export const addToInbox = async (req,res) => {

        const {recievers,senderId,message,type, Inboxdetails} = req.body;
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
                       userId: recieverId,
                       message: message,
                       type: type,
                    details: Inboxdetails,
                    read: false,
                   },
               });
           }
        
        }catch (error) {
           console.error("Error creating inbox:", error);
           res.status(500).json({ message: "Internal server error" });
         }
           
       }



export const getUserInbox = async (req, res) => {
  const userId = req.userId;
  try {
    const inbox = await prisma.inbox.findMany({
      where: {
        userId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(inbox);
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// the following function  checks the type of the inbox,
//eg if it is an invite, it will get the invite id from the details of
// that inbox and return every single detail  from that invite and option to accpet it of refuse it
export const viewInboxdetail = async (req, res) => {
  const inboxId = req.body.inboxId;
  try {
    const inbox = await prisma.inbox.findUnique({
      where: {
        id: inboxId,
      },
    });
    req.details = inbox.details; // include the details of the inbox in the request object
    if (inbox.type === "workspace_invite") {
      const inviteDetails = await GetInviteByIdFromInbox(req, res);
      res.status(200).json(inviteDetails);
    } else {
      res.status(200).json(inbox);
    }
  } catch (error) {
    console.error("Error fetching inbox details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
