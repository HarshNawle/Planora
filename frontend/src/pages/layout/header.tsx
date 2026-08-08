import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import WorkspaceAvatar from '@/components/workspace/workspace-avatar';
import { useGetWorkspacesQuery } from '@/hooks/use-workspace';
import { setStoredWorkspaceId } from '@/lib/workspace-storage';
import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types'
import { Bell, CircleUserRound, LogOut, Menu, PlusCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
    onWorkspaceSelected: (Workspace: Workspace) => void;
    selectedWorkspace: Workspace | null;
    onCreateWorkspace: () => void;
    onOpenMobileSidebar: () => void;
}

const Header = ({
    onWorkspaceSelected,
    selectedWorkspace,
    onCreateWorkspace,
    onOpenMobileSidebar
}: HeaderProps) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { data } = useGetWorkspacesQuery();
    const workspaces = (data ?? []) as Workspace[];
    const isOnWorkspacePage = useLocation().pathname.includes("/workspace");

    const handleOnClick = ( workspace: Workspace ) => {
        onWorkspaceSelected(workspace);
        setStoredWorkspaceId(workspace._id);
        const location = window.location;

        if(isOnWorkspacePage){
            navigate(`/workspaces/${workspace._id}`);
        } else {
            const basePath = location.pathname;
            navigate(`${basePath}?workspaceId=${workspace._id}`);
        }
    };

    return (
        <div className='bg-background top-0 z-40 borber-b'>
        <div className='h-14 flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-8'>
            <div className='flex items-center gap-2 min-w-0'>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className='lg:hidden shrink-0'
                    onClick={onOpenMobileSidebar}
                    aria-label="Open menu"
                >
                    <Menu className='size-5' />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2 max-w-[55vw] sm:max-w-xs">
                            {selectedWorkspace ? (
                                <>
                                    <WorkspaceAvatar
                                        color={selectedWorkspace.color}
                                        name={selectedWorkspace.name}
                                    />
                                    <span className="font-medium truncate">
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
                                    <DropdownMenuItem key={ws._id} onClick={() => handleOnClick(ws)} >
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
            </div>

            <div className='flex gap-2 items-center shrink-0'>
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