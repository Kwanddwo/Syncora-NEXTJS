import express from "express"
import { getWorkspacesByuserId } from "../controllers/workspacehandler.js"
import { handleInputError } from "../middleware/middleware.js";
import { getMembersByWorkspaceId } from "../controllers/workspacehandler.js"
export const routerr = express.Router();

routerr.get('/workspaces', getWorkspacesByuserId); 
routerr.post('/members', handleInputError,getMembersByWorkspaceId); //ALL members by workspaceId
export default routerr;
