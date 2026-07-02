import type { CreateTaskFormData } from "@/components/task/create-task-dialog";
import { fetchData, postData, updateData } from "@/lib/fetch-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {projectId: string; taskData: CreateTaskFormData }) => 
            postData(`/tasks/${data.projectId}/create-task`, data.taskData),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["project", data.project],
                });
            },
    });
};

export const useTaskByIdQuery = (taskId: string) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => fetchData(`/tasks/${taskId}`)
    })
};

export const useUpdateTaskTitleMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { title: string; taskId: string }) => 
            updateData(`/tasks/${data.taskId}/title`, {title: data.title}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
}