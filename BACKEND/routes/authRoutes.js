import express from "express";
import { addUser, emailCheck, login } from "../controllers/authController.js";
import {
  ResetPass,
  ResetPassword,
} from "../controllers/resetPassController.js";
import { verifyToken } from "../middleware/middleware.js";
const Router = express.Router();

Router.post("/login", login);
Router.post("/register", addUser);
Router.post("/emailCheck", emailCheck);
Router.post("/reset-pass", ResetPass);
Router.post("/reset-password", ResetPassword);
Router.post("/verify", verifyToken, (req, res) => {
  console.log("Token verified successfully");
  res.status(200).json({ message: "Token is valid" });
});

export default Router;
