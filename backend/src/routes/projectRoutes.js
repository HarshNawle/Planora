import express from "express";
import  authMiddleware  from '../middleware/auth-middleware.js'
import { validateRequest } from "zod-express-middleware";
import { projectSchema } from "../libs/validate-schema.js";
import z from "zod";
import { createProject, getProjectDetail, getProjectTasks  } from "../controllers/projectController.js";

const projectRoutes = express.Router();

projectRoutes.post(
    "/:workspaceId/create-project",
    authMiddleware,
    validateRequest({
        params: z.object({
            workspaceId: z.string()
        }),
        body: projectSchema,
    }),
    createProject
);

projectRoutes.get(
    "/:projectId",
    authMiddleware,
    validateRequest({
        params: z.object({
            projectId: z.string()
        }),
    }),
    getProjectDetail
);

projectRoutes.get(
    "/:projectId/tasks",
    authMiddleware,
    validateRequest({
        params: z.object({
            projectId: z.string()
        }),
    }),
    getProjectTasks
);

export default projectRoutes;