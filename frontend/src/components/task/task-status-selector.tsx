import type { TaskStatus } from "@/types"
import { Select, SelectTrigger, SelectValue } from "../ui/select"

const TaskStatusSelector = ({
    status,
    taskId
} : {
    status: string,
    taskId: TaskStatus
}) => {
    const handleStatusChange = (value: string) => {
        console.log(value)
    }
  return (
    <Select value={status || ""} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />   
        </SelectTrigger>
    </Select>
  )
  
}

export default TaskStatusSelector