import express from "express";
// import {zod} from "zod";
import {validateRequest} from "zod-express-middleware";
import { loginSchema, registerSchema, verifyEmailSchema } from "../libs/validate-schema.js";
import { login, signup, verifyEmail } from "../controllers/AuthController.js";

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
    verifyEmail
);

export default routes;