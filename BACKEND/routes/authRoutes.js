import express from "express";
import { addUser, login } from "../controllers/authController.js";
const Router=express.Router();

Router.post("/login",login);
Router.post("/register",addUser);


export default Router;