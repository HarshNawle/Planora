import express from "express";
import { validateRequest } from "zod-express-middleware";
import { workSpaceSchema } from "../libs/validate-schema.js";
import authMiddleware from "../middleware/auth-middleware.js";
import createWorkspace from "../controllers/workspaceController.js";


const workspaceRoutes = express.Router();

workspaceRoutes.post("/",
    authMiddleware,
    validateRequest({
        body: workSpaceSchema
    }),
    createWorkspace
);

export default workspaceRoutes;