import express from "express";
import { validateRequest } from "zod-express-middleware";
import { changePassword, updateUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth-middleware.js";
import z from "zod";

const userRoutes = express.Router();

userRoutes.get("/profile", authMiddleware, getUserProfile);
userRoutes.put("/profile", authMiddleware,
    validateRequest({
        body: z.object({
            name: z.string(),
            profilePicture: z.string().optional(),
        }),
    }),
    updateUserProfile
);

userRoutes.put("/change-password",
    authMiddleware,
    validateRequest({
        body: z.object({
            currentPassword: z.string(),
            newPassword: z.string(),
            confirmPassword: z.string(), 
        })
    }),
    changePassword 
)

export default userRoutes;
