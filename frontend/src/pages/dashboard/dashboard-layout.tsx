import { useAuth } from '@/provider/auth-context';
import { Loader } from 'lucide-react';
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../layout/header';
import { useEffect, useState } from 'react';
import type { Workspace } from '@/types';
import SidebarComponent from '../layout/SidebarComponent';
import CreateWorkspace from '@/components/workspace/createworkspace';
import { fetchData } from '@/lib/fetch-utils';
import { useGetWorkspacesQuery } from '@/hooks/use-workspace';
import { getWorkspaceIdFromLocation, setStoredWorkspaceId } from '@/lib/workspace-storage';

export  const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([fetchData("/workspaces")]);
    return { workspaces };
  } catch (error) {
      console.log(error);
  }
}

const DashBoardLayout = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { data: workspacesData } = useGetWorkspacesQuery();
  const workspaces = (workspacesData ?? []) as Workspace[];

  useEffect(() => {
    if (!isAuthenticated || workspaces.length === 0) return;

    const workspaceId = getWorkspaceIdFromLocation(location.pathname, searchParams);
    if (!workspaceId) return;

    const workspace = workspaces.find((ws) => ws._id === workspaceId);
    if (!workspace) return;

    setCurrentWorkspace((prev) => (prev?._id === workspace._id ? prev : workspace));
    setStoredWorkspaceId(workspace._id);
  }, [isAuthenticated, location.pathname, searchParams, workspaces]);

  // Wait until we know whether the user is authenticated.
  // isLoading starts as true and flips to false after localStorage is read,
  // so this prevents a flash-redirect on reload.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    setStoredWorkspaceId(workspace._id);
  }
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      {/* SidebarComponent  */}
      <SidebarComponent
        currentWorkspace={currentWorkspace}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className='flex flex-1 flex-col h-full min-w-0'>
        {/* Header  */}
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className='flex-1 overflow-y-auto w-full h-full' >
          <div className='mx-auto container px-3 sm:px-6 lg:px-8 py-4 md:py-8 w-full h-full' >
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashBoardLayout;