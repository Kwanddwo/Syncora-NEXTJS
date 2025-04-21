import * as recentWorkspaceController from '../controllers/recentWorspacehandler.js';
import express from 'express';
const router = express.Router();

router.post('/create', recentWorkspaceController.addRecentWorkspace);
router.post('/recent', recentWorkspaceController.getRecentWorkspaces);
router.delete('/delete', recentWorkspaceController.removeRecentWorkspace);
router.delete('/clear', recentWorkspaceController.clearRecentWorkspaces);

export default router;