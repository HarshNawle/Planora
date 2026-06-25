import express from "express";
import authRoutes from "./authRoutes.js";
import workspaceRoutes from "./workspaceRoutes.js";
import projectRoutes from "./projectRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/project", projectRoutes)

export default router;