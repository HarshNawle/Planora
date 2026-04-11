import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types'
import { CheckCircle2, ChevronLeft, ChevronRight, LayoutDashboard, ListCheck, LogOut, Settings, Users, Wrench } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import { cn } from '@/lib/utils';

const SidebarComponent = ({ currentWorkspace }: { currentWorkspace: Workspace | null }) => {
    const { user, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Workspaces",
            href: "/workspaces",
            icon: Users,
        },
        {
            title: "My Task",
            href: "/my-task",
            icon: ListCheck,
        },
        {
            title: "Members",
            href: "/members",
            icon: Users,
        },
        {
            title: "Achieved",
            href: "/achieved",
            icon: CheckCircle2,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ]

    return (
        <div
            className={`flex flex-col border-r bg-sidebar transition-all duration-300
                ${isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]"}
            `}
        >
            <div className='flex px-4 mb-4 h-14 items-center border-b'>
                <Link to="/dashboard" className='flex items-center' >
                    {
                        !isCollapsed && (
                            <div className='flex items-center gap-2' >
                                <Wrench className='size-6 text-blue-600' />
                                <span className='font-semibold text-lg hidden md:block' >
                                    Planora
                                </span>
                            </div>
                        )
                    }

                    {
                        isCollapsed && ( 

                            <Wrench className='size-6 text-blue-600' />

                        )
                    }
                </Link>

                <Button variant={"ghost"} size={"icon"} className='ml-auto hidden md:block'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {
                        isCollapsed ? (
                            <ChevronRight className='size-4' />
                        ) : (
                            <ChevronLeft className='size-4' />
                        )
                    }
                </Button>
            </div>

            <ScrollArea className='flex-1 px-3 py-2' >
                <SideNav
                    items={navItems}
                    isCollapsed={isCollapsed}
                    className={cn(isCollapsed && "items-center space-y-2")}
                    currentWorkspace={currentWorkspace}
                />
            </ScrollArea>

            <div>
                <Button variant={"ghost"} size={isCollapsed ? "icon" : "default"}
                    onClick={logout} >
                        <LogOut className={isCollapsed ? "size-4 mr-2" : "size-4"} />
                        <span className='hidden md:block'>Logout</span>
                </Button>
            </div>
        </div>
    )
}

export default SidebarComponent