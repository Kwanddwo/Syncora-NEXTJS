import express from "express";

import * as inviteController from "../controllers/inviteshandlers.js";
import * as workspacemiddleware from "../middleware/workspacemiddleware.js";
import * as middleware from "../middleware/middleware.js";
import * as invitesmiddleware from "../middleware/invitesmiddleware.js";

const router = express.Router();
//
router.post(
  "/send",
  workspacemiddleware.verifyworkspace,
  middleware.authenticateUser,
  workspacemiddleware.userMembershipCheck,
  // workspacemiddleware.adminPrivileges,
  invitesmiddleware.verifyReciever,
  invitesmiddleware.inviteAlreadyExists,
  inviteController.CreateInvite
);

router.post(
  "/accept",
  invitesmiddleware.verifyInvite,
  middleware.authenticateUser,
  invitesmiddleware.InviteAlreadyRespondedTo,
  inviteController.AcceptInvite
);

router.post(
  "/decline",
  invitesmiddleware.verifyInvite,
  middleware.authenticateUser,
  invitesmiddleware.InviteAlreadyRespondedTo,
  inviteController.DeclineInvite
);

export default router;
