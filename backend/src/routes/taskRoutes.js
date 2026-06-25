import express from "express";
import authMiddleware from "../middleware/auth-middleware";
import { validateRequest } from "zod-express-middleware";
import z from "zod";

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