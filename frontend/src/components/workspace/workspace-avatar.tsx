import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const WorkspaceAvatar = ({ color, name }: { color: string, name: string }) => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isInviteMember, setIsInviteMember] = useState(false)

    if(!workspaceId) {
        return ( <div>No workspace found</div> )
    }
    return (
        <div className='w-6 h-6 rounded flex items-center justify-center'
            style={{ background: color, }}>
            <span className='font-medium text-xs text-white' >
                { name.charAt(0).toUpperCase() }
            </span>
        </div>
    )
}

export default WorkspaceAvatar;