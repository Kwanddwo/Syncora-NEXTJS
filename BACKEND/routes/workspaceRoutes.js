import express from "express"
import { getWorkspacesByuserId } from "../controllers/workspacehandler.js"
export const routerr = express.Router();

routerr.get('/workspaces', getWorkspacesByuserId); 

export default routerr;