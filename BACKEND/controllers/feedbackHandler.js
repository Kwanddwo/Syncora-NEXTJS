import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function feedbackHandler(req, res) {
  const userId = req.userId; // Assuming userId is set in the request by middleware
  const { feedback } = req.body;

  console.log("Feedback received:", feedback);

  if (!feedback) {
    return res.status(400).json({ error: "Feedback is required." });
  }

  await prisma.feedback.create({
    data: {
      senderId: userId,
      message: feedback.message,
      type: feedback.type,
    },
  });

  // Respond with a success message
  return res.status(200).json({ message: "Feedback received successfully." });
}
