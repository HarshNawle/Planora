import express from "express";
import { validateRequest } from "zod-express-middleware";
import { inviteMemberSchema, workSpaceSchema } from "../libs/validate-schema.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { createWorkspace, getWorkspaceDetails, getWorkspaces, getWorkspaceProjects, getWorkspaceStats } from "../controllers/workspaceController.js";


const workspaceRoutes = express.Router();

workspaceRoutes.post("/",
    authMiddleware,
    validateRequest({
        body: workSpaceSchema
    }),
    createWorkspace
);

workspaceRoutes.post("/accept-invite-token",
    authMiddleware,
    validateRequest({
        body: z.object({
            token: z.string()

        })
    }),
    acceptInviteToken
);

workspaceRoutes.post("/:workspaceId/invite-member",
    authMiddleware,
    validateRequest({
        body: inviteMemberSchema
    }),
    inviteUserToWorkspace
);

workspaceRoutes.post("/:workspaceId/accept-generate-invite",
    authMiddleware,
    validateRequest({
        params: z.object({ workspaceId: z.string() })
    }),
    acceptGenerateInvite
);

workspaceRoutes.get("/", authMiddleware, getWorkspaces);
workspaceRoutes.get("/:workspaceId", authMiddleware, getWorkspaceDetails);
workspaceRoutes.get("/:workspaceId/projects", authMiddleware, getWorkspaceProjects);
workspaceRoutes.get("/:workspaceId/stats", authMiddleware, getWorkspaceStats);

export default workspaceRoutes;