import { z } from "zod";

const registerSchema = z.object({
    fullName: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 character long")
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

const verifyEmailSchema = z.object({
    token: z.string().min(1, "Token is required")
});

const emailSchema = z.object({
    email: z.string().email()
});

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(8, "Password must be atleast 8 character long"),
    confirmPassword: z.string().min(1, "Confirm Password is required")
});

const workSpaceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    color: z.string().min(1, "Color is required"),
})


export { 
    registerSchema,
    loginSchema,
    verifyEmailSchema,
    emailSchema,
    resetPasswordSchema,
    workSpaceSchema
};