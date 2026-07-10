import type { Subtask } from '@/types'
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAddSubTaskMutation, useUpdateSubTaskMutation } from '@/hooks/use-task';
import { toast } from 'sonner';

const SubTasksDetails = ({
    taskId,
    subtasks
}: {
    taskId: string,
    subtasks: Subtask[]
}) => {
    const [newSubTask, setNewSubTask] = useState("");
    const { mutate: addSubTask, isPending } = useAddSubTaskMutation();
    const { mutate: updateSubTask, isPending: isUpdating } = useUpdateSubTaskMutation();

    const handleToggleTask = ( subTaskId: string, checked: boolean ) => {
        updateSubTask(
            { taskId, subTaskId, completed: checked },
            {
                onSuccess: () => {
                    toast.success("Sub Task updated successfully");
                },
                onError: (error: any) => {
                    const errorrMessage = error.response.data.message;
                    toast.error(errorrMessage);
                    console.log(error); 
                }
            }
        )
    }
    const handleAddSubTask = () => {
        addSubTask(
            { taskId, title: newSubTask },
            {
                onSuccess: () => {
                    toast.success("Sub Task added successfully");
                },
                onError: (error: any) => {
                    const errorrMessage = error.response.data.message || "Failed to add sub task";
                    toast.error(errorrMessage);
                    console.log(error); 
                }
            }
        )
    }
    return (

        <div className='mt-6'>
            <h3 className='text-sm font-medium text-muted-foreground'>Sub Task</h3>
            <div className='space-y-2 mb-4'>
                {
                    subtasks.length > 0 ? (
                        subtasks.map((subtask) => (
                            <div key={subtask._id} className='flex items-center space-x-2'>
                                <Checkbox
                                    id={subtask._id}
                                    checked={subtask.completed}
                                    onCheckedChange={(checked) => 
                                        handleToggleTask(subtask._id, !!checked)
                                    }
                                    disabled={isUpdating}
                                />

                                <label className={cn("text-sm ", subtask.completed ? "line-through text-muted-foreground" : "")}>
                                    {subtask.title}
                                </label>
                            </div>
                        ))
                    ) : (
                        <div className='text-sm text-muted-foreground'>No sub tasks</div>
                    )
                }
            </div>

            <div className='flex'>
                <Input
                    placeholder='Add sub task'
                    value={newSubTask}
                    onChange={(e) => setNewSubTask(e.target.value)}
                    className='mr-1'
                    disabled={isPending    }
                />

                <Button onClick={handleAddSubTask} disabled={isPending || newSubTask.length === 0}>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default SubTasksDetails