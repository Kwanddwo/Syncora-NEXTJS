import express from "express"

import { handleInputError } from "../middleware/middleware.js";
import * as workspaceHandlers from "../controllers/workspacehandler.js";
export const routerr = express.Router();

routerr.get('/workspaces', workspaceHandlers.getWorkspacesByuserId); 
routerr.post('/members', handleInputError,workspaceHandlers.getMembersByWorkspaceId); //ALL members by workspaceId
export default routerr;
