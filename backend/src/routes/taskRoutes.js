import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { validateRequest } from "zod-express-middleware";
import z from "zod";
import { taskSchema } from "../libs/validate-schema.js";
import { createTask, getTaskById, updateTaskAssignees, updateTaskDescription, updateTaskStatus, updateTaskTitle } from "../controllers/taskController.js";

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

taskRoutes.get(
    "/:taskId",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
    }),
    getTaskById
);

taskRoutes.put(
    "/:taskId/title",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
    }),
    updateTaskTitle
);

taskRoutes.put(
    "/:taskId/description",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
        body: z.object({
            description: z.string()
        })
    }),
    updateTaskDescription
);

taskRoutes.put(
    "/:taskId/status",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
        body: z.object({
            status: z.string()
        })
    }),
    updateTaskStatus 
);

taskRoutes.put(
    "/:taskId/assignees",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
        body: z.object({
            assignees: z.array(z.string())
        })
    }),
    updateTaskAssignees
);



export default taskRoutes;