import { postData } from "@/lib/fetch-utils"
import type { WorkspaceForm } from "@/components/workspace/createworkspace"
import { useMutation } from "@tanstack/react-query"


export const useCreateWorkspace  = () => {
    return useMutation({
        mutationFn: async (data: WorkspaceForm) => postData("/workspaces", data),
    })
}