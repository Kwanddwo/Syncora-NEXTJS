import { handleInputError } from "../middleware/middleware.js";
import { getAllTasks } from "../controllers/taskhandlers.js"
import * as taskController from "../controllers/taskhandlers.js"
import * as workspaceController from "../controllers/workspacehandler.js";
import express from "express"
const router = express.Router();

// Middleware to verify token for all routes
router.post('/tasks', getAllTasks); //ALL TASKS

router.get('/usertasks', taskController.getTasksByUserId);
router.post("/create",
    handleInputError,
    workspaceController.verifyworkspace,
    workspaceController.userMembershipCheck,
    // workspaceController.adminPrivileges,
    taskController.CreateTask);


export default router;
