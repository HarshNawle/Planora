import type { TasksPriority } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useUpdateTaskPriorityMutation } from "@/hooks/use-task"
import { toast } from "sonner"

const TaskPrioritySelector = ({
    priority,
    taskId
}: {
    priority: TasksPriority,
    taskId: string
}) => {
    const { mutate, isPending } = useUpdateTaskPriorityMutation();

    const handlePriorityChange = (value: string) => {
        mutate(
            { taskId, priority: value as TasksPriority },
            {
                onSuccess: () => {
                    toast.success("Priority updated successfully");
                },
                onError: (error: any) => {
                    const errorrMessage = error.response.data.message;
                    toast.error(errorrMessage);
                    console.log(error); 
                }
            }
        )
    }
    return (
        <Select value={priority || ""} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="Low" >Low</SelectItem>
                <SelectItem value="Medium" >Medium</SelectItem>
                <SelectItem value="High" >High</SelectItem>
            </SelectContent>
        </Select>
    )

}

export default TaskPrioritySelector