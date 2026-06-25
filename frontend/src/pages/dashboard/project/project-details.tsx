import { usePRojectQuery } from '@/hooks/use-project';
import type { Project, Task, TaskStatus } from '@/types';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProjectDetails = () => {
    const {workspaceId, projectId} = useParams<{
        workspaceId: string,
        projectId: string
    }>();
    const navigate = useNavigate();

    const [isCreateTask, setIsCreateTask] = useState(false);
    const [taskFilter, setTaskFilter] = useState<TaskStatus | "All">("All")

    const {data, isLoading} = usePRojectQuery(projectId!) as {
      data: {
        project: Project;
        tasks: Task[];
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

    const {project, tasks} = data;
    const projectProgress = getProjectProgress(tasks);

    const handleTaskClick = (taskId: string) => {
      navigate(`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`)
    };

  return (
    <div>

    </div>
  )
}

export default ProjectDetails