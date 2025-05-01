import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// this ml is used to check if the user  requesting a specic user is  himself or another user
// if it is himself it will return the user details 
// and if it is another user it  will check the user preferences and if its alright it  returns the user details of that user
export const FindChecker = async (req, res, next) => {
    const loggedUser = req.userId;
    console.log("userId init", req.body.userId);
    try {
        if (!req.body.userId) {
            req.body.userId = loggedUser;
        } else {
            const user = await prisma.user.findUnique({
                where: { id: req.body.userId },
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            console.log("userId", req.body.userId);

        }

        next();
    } catch (error) {
        console.error("Error checking user preferences:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}