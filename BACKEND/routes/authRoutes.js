import express from "express";
import { addUser, emailCheck, login } from "../controllers/authController.js";
const Router=express.Router();

Router.post("/login",login);
Router.post("/register",addUser);
Router.post("/emailCheck",emailCheck);

export default Router;