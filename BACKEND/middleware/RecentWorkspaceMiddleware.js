import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkRecentWorkspaceExists = async (req, res, next) => {
    const { userId, workspaceId } = req.body;

    if (!userId || !workspaceId) {
        return res.status(400).json({ error: 'userId and workspaceId are required' });
    }

    try {
        const existing = await prisma.recentWorkspace.findUnique({
            where: {
                userId_workspaceId: { userId, workspaceId },
            },
        });

        if (existing) {
            return res.status(200).json({ message: 'Already exists in recent workspaces' });
        }

        next();
    } catch (error) {
        console.error('Middleware error:', error);
        return res.status(500).json({ error: 'Failed to check recent workspace' });
    }
};