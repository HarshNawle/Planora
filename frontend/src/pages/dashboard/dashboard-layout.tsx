import { useAuth } from '@/provider/auth-context';
import { Loader } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../layout/header';
import { useState } from 'react';
import type { Workspace } from '@/types';

const DashBoardLayout = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const { isAuthenticated, isLoading } = useAuth();

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
  }
  return (
    <div className="flex h-screen w-full">
      {/* SidebarComponent  */}

      <div className='flex flex-1 flex-col h-full'>
        {/* Header  */}
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setCurrentWorkspace(null)}
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