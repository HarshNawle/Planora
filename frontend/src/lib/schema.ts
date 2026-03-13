import {z} from "zod";

export const logInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password is required"),
});

export const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters"),
    confirmPassword: z.string().min(8, "Password must be 8 characters"),
    fullName: z.string().min(3, "Name must be at least 3 characters")
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});