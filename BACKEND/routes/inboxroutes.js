import express from "express";

import * as inboxhandler from "../controllers/inboxhandlers.js";
import * as middleware from "../middleware/middleware.js";

const router = express.Router();
router.post(
  "/my-Inbox",
  middleware.authenticateUser,
  inboxhandler.getUserInbox
);
router.post("/mark-read", middleware.authenticateUser, inboxhandler.markAsRead);
router.post(
  "/mark-all-read",
  middleware.authenticateUser,
  inboxhandler.markAllAsRead
);
router.post(
  "/mark-unread",
  middleware.authenticateUser,
  inboxhandler.markAsUnread
);
router.post(
  "/view-details",
  middleware.authenticateUser,
  inboxhandler.viewInboxdetail
);

export default router;
