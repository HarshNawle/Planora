import { fetchData, updateData } from "@/lib/fetch-utils";
import type { ChangePasswordFormData, ProfileFormData } from "@/pages/dashboard/user/profile";
import { useQuery, type QueryKey, useMutation } from "@tanstack/react-query";

const queryKey: QueryKey = ["user"];

export const useUserProfileQuery = () => {
    return useQuery(
        {
            queryKey,
            queryFn: () => fetchData("/users/profile"),
        }
    )
};

export const useChangePassword = () => {
    return useMutation(
        {
           mutationFn: (data: ChangePasswordFormData) => 
            updateData("/users/change-password", data)
        }
    )
};

export const useUploadUserProfile = () => {
    return useMutation(
        {
           mutationFn: (data: ProfileFormData) => 
            updateData("/users/profile", data)
        }
    )
};

