import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types'
import { CheckCircle2, ChevronLeft, ChevronRight, LayoutDashboard, ListCheck, LogOut, Settings, Users, Wrench, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import { cn } from '@/lib/utils';

interface SidebarComponentProps {
    currentWorkspace: Workspace | null;
    isMobileOpen: boolean;
    onCloseMobile: () => void;
}

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
        href: "/my-tasks",
        icon: ListCheck,
    },
    {
        title: "Members",
        href: "/members",
        icon: Users,
    },
    {
        title: "Archieved",
        href: "/archieved",
        icon: CheckCircle2,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
]

const SidebarComponent = ({ currentWorkspace, isMobileOpen, onCloseMobile }: SidebarComponentProps) => {
    const { user, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        onCloseMobile();
        logout();
    };

    const SidebarContent = ({ collapsed, onToggleCollapse, showToggle, showHeader = true, fillWidth = false }: {
        collapsed: boolean;
        onToggleCollapse: () => void;
        showToggle: boolean;
        showHeader?: boolean;
        fillWidth?: boolean;
    }) => (
        <div
            className={cn(
                "flex flex-col h-full transition-all duration-300",
                fillWidth ? "w-full" : (collapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]")
            )}
        >
            {
                showHeader && (
                    <div className='flex px-4 mb-4 h-14 items-center border-b'>
                        <Link to="/dashboard" className='flex items-center' onClick={onCloseMobile}>
                            {
                                !collapsed && (
                                    <div className='flex items-center gap-2' >
                                        <Wrench className='size-6 text-blue-600' />
                                        <span className='font-semibold text-lg hidden md:block' >
                                            Planora
                                        </span>
                                    </div>
                                )
                            }

                            {
                                collapsed && (
                                    <Wrench className='size-6 text-blue-600' />
                                )
                            }
                        </Link>

                        {
                            showToggle && (
                                <Button variant={"ghost"} size={"icon"} className='ml-auto hidden md:block'
                                    onClick={onToggleCollapse}
                                >
                                    {
                                        collapsed ? (
                                            <ChevronRight className='size-4' />
                                        ) : (
                                            <ChevronLeft className='size-4' />
                                        )
                                    }
                                </Button>
                            )
                        }
                    </div>
                )
            }

            <ScrollArea className='flex-1 px-3 py-2' >
                <SideNav
                    items={navItems}
                    isCollapsed={collapsed}
                    className={cn(collapsed && "items-center space-y-2")}
                    currentWorkspace={currentWorkspace}
                    onNavigate={onCloseMobile}
                />
            </ScrollArea>

            <div>
                <Button variant={"ghost"} size={collapsed ? "icon" : "default"}
                    onClick={handleLogout} className={cn(!collapsed && "ml-3 mb-3")}>
                    <LogOut className={cn("size-4", !collapsed && "mr-2")} />
                    <span className='hidden md:block'>Logout</span>
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <div className='hidden lg:flex flex-col border-r bg-sidebar h-full'>
                <SidebarContent
                    collapsed={isCollapsed}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                    showToggle
                />
            </div>

            {/* Mobile drawer */}
            <div
                className={cn(
                    "fixed inset-0 z-50 lg:hidden",
                    isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
                )}
                aria-hidden={!isMobileOpen}
            >
                <div
                    className={cn(
                        "absolute inset-0 bg-black/50 transition-opacity duration-300",
                        isMobileOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={onCloseMobile}
                />

                <div
                    className={cn(
                        "absolute inset-y-0 left-0 w-72 bg-sidebar border-r shadow-xl transition-transform duration-300",
                        isMobileOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className='flex h-14 items-center justify-between border-b px-4'>
                        <Link to="/dashboard" className='flex items-center gap-2' onClick={onCloseMobile}>
                            <Wrench className='size-6 text-blue-600' />
                            <span className='font-semibold text-lg' >Planora</span>
                        </Link>

                        <Button variant={"ghost"} size={"icon"} onClick={onCloseMobile} aria-label="Close menu">
                            <X className='size-5' />
                        </Button>
                    </div>

                    <div className='h-[calc(100%-3.5rem)]'>
                        <SidebarContent
                            collapsed={false}
                            onToggleCollapse={() => { }}
                            showToggle={false}
                            showHeader={false}
                            fillWidth
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarComponent
