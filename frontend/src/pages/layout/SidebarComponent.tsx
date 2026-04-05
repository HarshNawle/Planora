import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types'
import { CheckCircle2, LayoutDashboard, ListCheck, Settings, Users } from 'lucide-react';

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
        <div>

        </div>
    )
}

export default SidebarComponent