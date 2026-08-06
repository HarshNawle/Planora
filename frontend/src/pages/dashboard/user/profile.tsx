import { useAuth } from "@/provider/auth-context";
import type { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "New password is required" }),
    confirmPassword: z.string().min(8, { message: "Confirm password is required" }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"],
    });

const profileSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    profilePicture: z.string().optional()
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
    const { data: user, isPending } = useUserProfileQuery() as {
        data: User;
        isPending: boolean;
    };

    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.fullName || "",
            profilePicture: user?.profilePicture || "",
        },
        values: {
            name: user?.fullName || "",
            profilePicture: user?.profilePicture || ""
        }
    });

    return (
        <div>
            
        </div>
    )
}

export default Profile; 