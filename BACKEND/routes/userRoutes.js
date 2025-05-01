import express from "express";
import { getUserDetails , updateUserDetails , deleteUserAccount } from "../controllers/userhandlers.js";
import { authenticateUser } from "../middleware/middleware.js";
import { FindChecker } from "../middleware/usermiddleware.js";
import { FixSuccessors } from "../middleware/usermiddleware.js";

const router = express.Router();

router.post("/UserDetails",authenticateUser,FindChecker, getUserDetails);
router.put("/UpdateDetails",authenticateUser, updateUserDetails);
router.delete("/DeleteAccount",authenticateUser,FixSuccessors, deleteUserAccount);

export default router;