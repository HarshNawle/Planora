import { Button } from '@/components/ui/button';
import { useAuth } from '@/provider/auth-context';
import { LogOut } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm text-muted-foreground">
          {user?.name ?? user?.email ?? 'Dashboard'}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer gap-2"
          onClick={() => void logout()}
        >
          <LogOut className="size-4" />
          Log out
        </Button>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;