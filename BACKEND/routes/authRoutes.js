import express from "express";
import { addUser, emailCheck, login } from "../controllers/authController.js";
import {
  ResetPass,
  ResetPassword,
} from "../controllers/resetPassController.js";
const Router = express.Router();

Router.post("/login", login);
Router.post("/register", addUser);
Router.post("/emailCheck", emailCheck);
Router.post("/reset-pass", ResetPass);
Router.post("/reset-password", ResetPassword);

export default Router;
