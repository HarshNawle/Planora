import { useTaskByIdQuery } from '@/hooks/use-task';
import type { Project, Task } from '@/types';
import { Loader } from 'lucide-react';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TaskDetails = () => {
  const { taskId, projectId, workspaceId } = useParams<
    {
      taskId: string;
      projectId: string;
      workspaceId: string
    }
  >();

  const navigate = useNavigate();
  const { data, isLoading } = useTaskByIdQuery(taskId!) as {
    data: {
      task: Task;
      project: Project;
    };
    isLoading: boolean;
  };

  if(isLoading) {
    return (
      <div>
        <Loader/>
      </div>
    )
  };

  if(!data) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className='text-2xl font-bold'></div>
      </div>
    )
  };

  return (
    <div>TaskDetail</div>
  )
}

export default TaskDetails