import type { CreateTaskFormData } from "@/components/task/create-task-dialog";
import { fetchData, postData, updateData } from "@/lib/fetch-utils";
import type { TaskStatus, TasksPriority } from "@/types";
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
};

export const useUpdateTaskStatusMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { status: TaskStatus; taskId: string }) => 
            updateData(`/tasks/${data.taskId}/status`, {status: data.status}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
}; 

export const useUpdateTaskDescriptionMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { description: string; taskId: string }) => 
            updateData(`/tasks/${data.taskId}/description`, {description: data.description}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
};  

export const useUpdateTaskAssigneesMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { assignees: string[]; taskId: string }) => 
            updateData(`/tasks/${data.taskId}/assignees`, {assignees: data.assignees}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
};  

export const useUpdateTaskPriorityMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { priority: TasksPriority; taskId: string }) => 
            updateData(`/tasks/${data.taskId}/priority`, {priority: data.priority}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
}; 

export const useAddSubTaskMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { title: string; taskId: string }) => 
            postData(`/tasks/${data.taskId}/add-subtask`, {title: data.title}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
}; 

export const useUpdateSubTaskMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: { subTaskId: string; taskId: string; completed: boolean }) => 
            postData(`/tasks/${data.taskId}/update-subtask/${data.subTaskId}`, {completed: data.completed}),
            onSuccess: (data: any) => {
                queryClient.invalidateQueries({
                    queryKey: ["task", data._id]
                })
            }
    })
}; 

