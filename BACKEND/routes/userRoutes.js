import express from "express";

import { handleInputError } from "../middleware/middleware.js";
import * as userHandlers from "../controllers/userhandlers.js";
import { authenticateUser } from "../middleware/middleware.js";
export const routerr = express.Router();

routerr.post(
  "/email",
  handleInputError,
  authenticateUser,
  userHandlers.getUsersByEmail
);

export default routerr;
