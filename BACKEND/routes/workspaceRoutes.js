import express from "express"
import { json } from "stream/consumers"
import { handleInputError } from "../middleware/middleware.js"
import { body } from "express-validator"
import { getWorkspacesByuserId } from "../controllers/workspacehandler.js"
export const routerr = express.Router();

routerr.get('/workspaces',getWorkspacesByuserId); //ALL WORKSPACES
