import { fetchData, postData } from "@/lib/fetch-utils"
import type { WorkspaceForm } from "@/components/workspace/createworkspace"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useCreateWorkspace  = () => {
    return useMutation({
        mutationFn: async (data: WorkspaceForm) => postData("/workspaces", data),
    })
};

export const useGetWorkSpaceQuery = () => {
    return useQuery(
        {
            queryKey: ["workspace"],
            queryFn: async () => fetchData("/workspaces"),
        }
    );
};