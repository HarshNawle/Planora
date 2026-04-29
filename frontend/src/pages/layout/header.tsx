import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import WorkspaceAvatar from '@/components/workspace/workspace-avatar';
import { useGetWorkSpaceQuery } from '@/hooks/use-workspace';
import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types'
import { Bell, CircleUserRound, LogOut, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

    const { user, logout } = useAuth();
    const { data } = useGetWorkSpaceQuery();
    const workspaces = (data ?? []) as Workspace[];

    return (
        <div className='bg-background top-0 z-40 borber-b'>
            <div className='h-14 flex items-center justify-between px-4 py-4 sm:px-4 lg:px-8'>
                <DropdownMenu>
                    <DropdownMenuTrigger >
                        <Button variant="outline" className="flex items-center gap-2">
                            {selectedWorkspace ? (
                                <>
                                    <WorkspaceAvatar
                                        color={selectedWorkspace.color}
                                        name={selectedWorkspace.name}
                                    />
                                    <span className="font-medium">
                                        {selectedWorkspace.name}
                                    </span>
                                </>
                            ) : (
                                <span>Select Workspace</span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuGroup>
                            {
                                workspaces.map((ws) => (
                                    <DropdownMenuItem key={ws._id} onClick={() => onWorkspaceSelected(ws)} >
                                        {ws.color && (
                                            <WorkspaceAvatar color={ws.color} name={ws.name} />
                                        )}
                                        <span className='text-black'>{ws.name}</span>
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuGroup>

                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={onCreateWorkspace} >
                                <PlusCircle className='size-4 mr-2' />
                                Create Workspace
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='flex gap-2 items-center'>
                    <Button variant={"ghost"} size="icon">
                        <Bell />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='w-8 h-8 border-none rounded-full' >
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={user?.profilePicture} />
                                <AvatarFallback className='bg-primary text-white'>
                                    {user?.fullName?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='cursor-pointer'>
                                <CircleUserRound className='size-5' />
                                <Link to='/user/profile'>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className='cursor-pointer' > <LogOut className='text-red-500 ml-1' /> Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )
}

export default Header