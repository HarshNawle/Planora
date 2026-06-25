import type { TaskStatus } from '@/types';
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

    const {data, isLaoding} = useProjectQuery(projectId)
  return (
    <div>ProjectDetails</div>
  )
}

export default ProjectDetails