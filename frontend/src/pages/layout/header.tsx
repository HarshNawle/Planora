import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import  { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types'
import { Bell } from 'lucide-react';
import React from 'react'

interface HeaderProps {
    onWorkspaceSelected: (Workspace: Workspace) => void;
    selectedWorkspace: Workspace | null;
    onCreateWorkspace: () => void
}

const Header = ({ 
    onWorkspaceSelected,
    selectedWorkspace,
    onCreateWorkspace
}: HeaderProps) => {

    const { user } = useAuth()

    return (
        <div className='bg-background top-0 z-40 borber-b'>
            <div className='h-14 flex items-center justify-between px-4 py-4 sm:px-4 lg:px-8'>

                <div className='flex gap-2 items-center'>
                    <Button variant="ghost" size="icon">
                        <Bell/>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <button>

                            </button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )
}

export default Header