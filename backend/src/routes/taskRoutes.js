import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { validateRequest } from "zod-express-middleware";
import z from "zod";
import { taskSchema } from "../libs/validate-schema.js";
import { createTask } from "../controllers/taskController.js";

const taskRoutes = express.Router();

taskRoutes.post(
    "/:projectId/create-task",
    authMiddleware,
    validateRequest({
        params: z.object({
            projectId: z.string(),
        }),
        body: taskSchema,
    }),
    createTask
);

export default taskRoutes;