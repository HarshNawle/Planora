import express from "express";
import { validateRequest } from "zod-express-middleware";
import { workSpaceSchema } from "../libs/validate-schema.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { createWorkspace, getWorkspaceDetails, getWorkspaces } from "../controllers/workspaceController.js";


const workspaceRoutes = express.Router();

workspaceRoutes.post("/",
    authMiddleware,
    validateRequest({
        body: workSpaceSchema
    }),
    createWorkspace
);

workspaceRoutes.get("/", authMiddleware, getWorkspaces);
workspaceRoutes.get("/:workspaceId", authMiddleware, getWorkspaceDetails);
workspaceRoutes.get("/:workspaceId/projects", authMiddleware, getWorkspaceProjects);

export default workspaceRoutes;