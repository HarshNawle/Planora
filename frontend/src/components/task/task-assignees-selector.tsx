import type { ProjectMemberRole, Task, User } from '@/types'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const TaskAssigneesSelector = ({
    task,
    assignees,
    projectMembers
}: {
    task: Task,
    assignees: User[],
    projectMembers: { user: User; role: ProjectMemberRole }[];
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(
        assignees.map((assignee) => assignee._id)
    );
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const handleSelectAll = () => {
        const allIds = projectMembers.map((m) => m.user._id);
        setSelectedIds(allIds);
    };

    const handleUnSelectAll = () => {
        setSelectedIds([]);
    }

    return (
        <div className='mb-6'>
            <h3 className='text-sm font-medium text-muted-foreground'>
                Assignees
            </h3>
            <div className='flex flex-wrap gap-2 mb-2'>
                {
                    selectedIds.length === 0 ? (
                        <span className='text-xs text-muted-foreground'>Unassigned</span>
                    ) : (
                        projectMembers.filter((member) => selectedIds.includes(member.user._id))
                            .map((m) => (
                                <div
                                    key={m.user._id}
                                    className='flex items-center bg-gray-100 rounded-full mt-1'
                                >
                                    <Avatar>
                                        <AvatarImage src={m.user.profilePicture} />
                                        <AvatarFallback>{m.user.fullName?.charAt(0) ?? 'U'}</AvatarFallback>
                                    </Avatar>
                                    <span className='text-xs text-muted-foreground'>
                                        {m.user.fullName}
                                    </span>
                                </div>
                            ))
                    )
                }
            </div>

            <div className='relative'>
                <button className='text-sm text-muted-foreground w-full border rounded px-3 py-2 text-left bg-white'
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                >
                    {
                        selectedIds.length===0 ? "Select assignees" : `${selectedIds.length} selected`
                    }
                </button>

                {
                    dropDownOpen && (
                        <div className='absolute z-10 mt-1 w-full bg-white border rounded  shadow-lg max-h-60 overflow-y-auto'>
                            <div className='flex justify-between px-2 py-1 border-b'>
                                <button className='cursor-pointer text-xs text-blue-600' onClick={handleSelectAll}>Select all</button>
                                <button className='cursor-pointer text-xs text-red-600' onClick={handleUnSelectAll}>Unselect all</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TaskAssigneesSelector