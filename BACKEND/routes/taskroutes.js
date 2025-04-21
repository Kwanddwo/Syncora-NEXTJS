import { handleInputError } from "../middleware/middleware.js";
import { getAllTasks } from "../controllers/taskhandlers.js"
import * as taskController from "../controllers/taskhandlers.js"
import * as workspaceMiddleware from "../middleware/workspacemiddleware.js"
import express from "express"
const router = express.Router();

// Middleware to verify token for all routes
router.post('/tasks', getAllTasks); //ALL TASKS

router.get('/usertasks', taskController.getTasksByUserId);

router.post("/create",
    handleInputError,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    // workspaceMiddleware.adminPrivileges,
    taskController.CreateTask);

router.delete("/delete",
    handleInputError,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    /* workspaceMiddleware.adminPrivileges, */
    taskController.DeleteTask);   

router.put("/updateTask",
    handleInputError,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    /* workspaceMiddleware.adminPrivileges, */
    taskController.UpdateTask);
router.put("/updateStatus",
    handleInputError,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    taskController.updateTaskStatus);
export default router;
