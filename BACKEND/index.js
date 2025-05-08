import express from "express";
// import http from 'http';
// import { Server } from 'socket.io';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import emailVrfRoute from "./routes/emailVrfRoute.js";
import cookieParser from "cookie-parser";

import taskroutes from "./routes/taskroutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import inviteRoutes from "./routes/invitesroutes.js";
import inboxRoutes from "./routes/inboxroutes.js";
import recentWorkspaceRoutes from "./routes/recentWorkspaceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();
// process.env.FRONTEND_URL
console.log("Environment variables loaded:", process.env.FRONTEND_URL);

const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL, // single origin
  // or for multiple:
  // origin: ['https://site1.com','https://site2.com'],
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/emailverification", emailVrfRoute);
app.use("/api/task", taskroutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/inbox", inboxRoutes);
app.use("/api/recentWorkspace", recentWorkspaceRoutes);
app.use("/api/user", userRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
