import { PrismaClient } from "@prisma/client";

export	const prisma = new PrismaClient();
export const getUserDetails = async (req, res) => {
    const userId = req.body.userId;
    try {   
        const user = await prisma.user.findUnique({
            where: { 
                id: userId
            },
            select: {
                name: true,
                lastName: true,
                email: true,
                avatarUrl: true,
                createdAt: true,
                workspaceMembership: {
                    select: {
                        workspace: {
                            select: {
                                name: true,
                                description: true,
                                icon: true,
                            }
                        },
                        role: true,
                    }
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        
        const finalUser = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            preferences: user.preferences,
            workspaces: user.workspaceMembership.map(membership => ({
                name: membership.workspace.name,
                icon: membership.workspace.icon,
                role: membership.role
            }))
        };
        
        res.status(200).json(finalUser);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateUserDetails = async (req, res) => {
    const userId = req.buserId;
    const { name, lastName, email, avatarUrl } = req.body;
    
    try {
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
        res.status(200).json({
            message: "User details updated successfully"});
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteUserAccount = async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    console.log("middleware worked"); 
    try {
        await prisma.user.delete({
            where: { id: userId },
        });
        
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
