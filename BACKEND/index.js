import express from "express";
// import http from 'http';
// import { Server } from 'socket.io';
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import emailVrfRoute from "./routes/emailVrfRoute.js";
import cookieParser from "cookie-parser";
import taskroutes from "./routes/taskroutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";

import inviteRoutes from "./routes/invitesroutes.js";

import recentWorkspaceRoutes from "./routes/recentWorkspaceRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/emailverification", emailVrfRoute);
app.use("/api/task", taskroutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/recentWorkspace", recentWorkspaceRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
