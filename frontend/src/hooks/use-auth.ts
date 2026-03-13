import { postData } from "@/lib/fetch-utils";
import type { SignupFormData } from "@/pages/Auth/Signup";
import { useMutation } from "@tanstack/react-query";


export const useSignupMutation = () => {
    return  useMutation({
        mutationFn: (data: SignupFormData) => postData("/auth/signup", data),
    });
};