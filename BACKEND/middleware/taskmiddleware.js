import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const extractWorkspaceMemberUserIds = async (req, res, next) => {
    try {
      const { workspaceMemberIds } = req.body;
  
      const memberUserIds = await prisma.workspaceMember.findMany({
        where: {
          id: {
            in: workspaceMemberIds,
          },
        },
        select: {
          userId: true,
        },
      });
  
      req.memberUserIds = memberUserIds.map(m => m.userId);
  
      next();
    } catch (error) {
      console.error("Error extracting user ids:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
 export  const filterAlreadyAssignedUsers = async (req, res, next) => {
    console.log(req.memberUserIds)
    try {
      const { memberUserIds } = req;
      const { taskId } = req.body;
  
      const existingAssignees = await prisma.taskAssignee.findMany({
        where: {
          taskId: taskId,
        },
        select: {
          userId: true,
        },
      });
      const existingUserIds = existingAssignees.map(a => a.userId);
  
      const newAssignees = memberUserIds.filter(id => !existingUserIds.includes(id));
      console.log(newAssignees)
      req.body.assigneeIds = newAssignees;
      if (newAssignees.length === 0) {
        return res.status(400).json({ message: "All users are already assigned to this task." });
      }
      next();
    } catch (error) {
      console.error("Error filtering assigned users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };