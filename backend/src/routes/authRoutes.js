import express from "express";
// import {zod} from "zod";
import {validateRequest} from "zod-express-middleware";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "../libs/validate-schema.js";
import { login, resetPasswordRequest, signup, verifyEmail, verifyResetPasswordTokenAndResetPassword } from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.post("/signup",
    validateRequest({
        body:registerSchema
    }),
    signup
);

authRoutes.post("/login",
    validateRequest({
        body:loginSchema
    }),
    login
);

authRoutes.post("/verify-email",
    validateRequest({
        body: verifyEmailSchema,
    }),
    verifyEmail
);

authRoutes.post("/reset-password-request",
    validateRequest({
        body: emailSchema
    }),
    resetPasswordRequest
);

authRoutes.post("/reset-password",
    validateRequest({
        body: resetPasswordSchema
    }),
    verifyResetPasswordTokenAndResetPassword
);


export default authRoutes;