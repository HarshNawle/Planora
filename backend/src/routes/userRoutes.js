import express from "express";

const userRoutes = express.Router();

userRoutes.get("/profile", authenticateUser, getUserProfile);

export default userRoutes;
