import express from "express";
// import {zod} from "zod";
import {validateRequest} from "zod-express-middleware";
import { loginSchema, registerSchema } from "../libs/validate-schema.js";
import { login, signup } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup",
    validateRequest({
        body:registerSchema
    }),
    signup
);

router.post("/login",
    validateRequest({
        body:loginSchema
    }),
    login
);

export default router;