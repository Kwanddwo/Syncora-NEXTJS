import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsersByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error("Email is required");
  }

  console.log(`Email: ${email}`);

  if (email.length < 2) {
    throw new Error("Email must be at least 2 characters long");
  }
  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: email,
        mode: "insensitive",
      },
    },
  });

  console.log(users);
  return res.status(200).json({ users });
};
