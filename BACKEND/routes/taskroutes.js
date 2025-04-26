import { handleInputError } from "../middleware/middleware.js";
import { getAllTasks } from "../controllers/taskhandlers.js"
import * as taskController from "../controllers/taskhandlers.js"
import * as workspaceMiddleware from "../middleware/workspacemiddleware.js"
import * as taskmiddleware from "../middleware/taskmiddleware.js"
import { authenticateUser } from "../middleware/middleware.js";
import express from "express"
const router = express.Router();

router.post('/tasks',
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
     getAllTasks); 

router.get('/usertasks', taskController.getTasksByUserId);

router.post("/create",
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    // workspaceMiddleware.adminPrivileges,
    taskController.CreateTask);

router.delete("/delete",
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    /* workspaceMiddleware.adminPrivileges, */
    taskController.DeleteTask);   

router.put("/updateTask",
    handleInputError,
    authenticateUser,   
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    /* workspaceMiddleware.adminPrivileges, */
    taskController.UpdateTask);
router.put("/updateStatus",
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    workspaceMiddleware.adminPrivileges,
    
    taskController.updateTaskStatus);


router.post("/assign",
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    taskmiddleware.extractWorkspaceMemberUserIds,
    taskmiddleware.filterAlreadyAssignedUsers,

    taskController.assignTask);
router.delete("/unassign",
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    taskmiddleware.extractWorkspaceMemberUserIds,
    taskmiddleware.filterUnassignedUsers,
    taskController.unassignTask);

router.put("/updatePriority",
    handleInputError,
    authenticateUser,
    workspaceMiddleware.verifyworkspace,
    workspaceMiddleware.userMembershipCheck,
    workspaceMiddleware.adminPrivileges,
    taskmiddleware.verifyTask,
    
    taskController.updateTaskPriority);

    export default router;
