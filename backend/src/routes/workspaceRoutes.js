import express from "express";
import { validateRequest } from "zod-express-middleware";
import { workSpaceSchema } from "../libs/validate-schema";


const routes = express.Router();

routes.post("/",
    validateRequest({
        body: workSpaceSchema
    }),
    createWorkspace);

export default routes;