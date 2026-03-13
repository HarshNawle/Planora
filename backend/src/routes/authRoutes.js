import express from "express";
// import {zod} from "zod";
import {validateRequest} from "zod-express-middleware";
import { loginSchema, registerSchema } from "../libs/validate-schema.js";
import { login, signup } from "../controllers/AuthController.js";

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

export default routes;