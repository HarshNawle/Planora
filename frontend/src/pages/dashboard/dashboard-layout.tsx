import { Button } from '@/components/ui/button';
import { useAuth } from '@/provider/auth-context';
import { Loader, LogOut } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../layout/header';
import { useState } from 'react';
import type { Workspace } from '@/types';

const DashBoardLayout = () => {
  const { user, logout } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  }
  return (
    <div className="flex h-screen w-full">
      {/* SidebarComponent  */}

      <div className='flex flex-1 flex-col h-full'>
        {/* Header  */}
        <Header
        onWorkspaceSelected={handleWorkspaceSelected}
        selectedWorkspace={currentWorkspace}
        onCreateWorkspace={() => setCurrentWorkspace(true)}
        />

        <main className='flex-1 overflow-y-auto w-full h-full' >
          <div className='mx-auto container px-2 sm:px-6 lg:px-8 md:py-8 w-full h-full' >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;