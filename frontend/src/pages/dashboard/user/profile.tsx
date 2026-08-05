
const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, {message: "Current password is required"}),
    newPassword: z.string().min(8, {})
})