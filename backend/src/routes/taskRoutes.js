import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { validateRequest } from "zod-express-middleware";
import z from "zod";
import { taskSchema } from "../libs/validate-schema.js";
import { addComment, addSubTask, archivedTask, createTask, getActivityByResourceId, getCommentByTaskId, getTaskById, updateSubtask, updateTaskAssignees, updateTaskDescription, updateTaskPriority, updateTaskStatus, updateTaskTitle, watchTask } from "../controllers/taskController.js";

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

taskRoutes.put(
    "/:taskId/priority",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
        body: z.object({
            priority: z.string()
        })
    }),
    updateTaskPriority
);

taskRoutes.post(
    "/:taskId/add-subtask",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
        body: z.object({
            title: z.string()
        })
    }),
    addSubTask
);

taskRoutes.put(
    "/:taskId/update-subtask/:subTaskId",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
            subTaskId: z.string()
        }),
        body: z.object({
            completed: z.boolean()
        })
    }),
    updateSubtask
);

taskRoutes.get(
    "/:resourceId/activity",
    authMiddleware,
    validateRequest({
        params: z.object({
            resourceId: z.string(),
        }),
    }),
    getActivityByResourceId
);

taskRoutes.get(
    "/:taskId/comments",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
    }),
    getCommentByTaskId
);

taskRoutes.post(
    "/:taskId/add-comment",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
        body: z.object({
            text: z.string()
        })
    }),
    addComment 
);

taskRoutes.post(
    "/:taskId/watch",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
    }),
    watchTask
);

taskRoutes.post(
    "/:taskId/archived",
    authMiddleware,
    validateRequest({
        params: z.object({
            taskId: z.string(),
        }),
    }),
    archivedTask
);


export default taskRoutes;