import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import emailVrfRoute from "./routes/emailVrfRoute.js";
import cookieParser from "cookie-parser";
import taskroutes from "./routes/taskroutes.js"
import {routerr} from "./routes/workspaceRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })) 

app.use("/api/auth", authRoutes);
app.use("/api/emailverification",emailVrfRoute);
app.use("/api/",taskroutes)

app.listen(3001, () => console.log("Server running on port 3001"));
