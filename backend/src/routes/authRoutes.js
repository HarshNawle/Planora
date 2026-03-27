import express from "express";
// import {zod} from "zod";
import {validateRequest} from "zod-express-middleware";
import { loginSchema, registerSchema, verifyEmailSchema } from "../libs/validate-schema.js";
import { login, resetPasswordRequest, signup, verifyEmail, verifyResetPasswordTokenAndResetPassword } from "../controllers/AuthController.js";

const routes = express.Router();

routes.post("/signup",
    validateRequest({
        body:registerSchema
    }),
    signup
);

routes.post("/login",
    validateRequest({
        body:loginSchema
    }),
    login
);

routes.post("/verify-email",
    validateRequest({
        body: verifyEmailSchema,
    }),
verifyEmai
);

routes.post("/reset-password-request",
    validateRequest({
        body: {
            email: z.string().email()
        }
    }),
    resetPasswordRequest
);

routes.post("/reset-password",
    validateRequest({
        body: {
            email: z.string().email()
        }
    }),
    verifyResetPasswordTokenAndResetPassword
);


export default routes;