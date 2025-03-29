import express from "express";
import { SendEmail,VerifCode } from "../controllers/emailVrfController.js";

const router = express.Router();

router.post("/send-email", SendEmail);
router.post("/verify-code", VerifCode);

export default router;