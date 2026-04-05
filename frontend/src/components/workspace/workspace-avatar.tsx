import React from 'react'

const WorkspaceAvatar = ({ color, name }: { color: string, name: string }) => {
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