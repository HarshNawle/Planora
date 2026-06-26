import type { ProjectMemberRole, User } from '@/types';
import React from 'react'

interface CreateTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void ;
    projectId: string;
    projectMembers: {user: User; role: ProjectMemberRole }[]
}

export type CreateTaskFormData = z.infer<typeof createTaskSchema>

const CreateTaskDialog = () => {
  return (
    <div>
        
    </div>
  )
}

export default CreateTaskDialog