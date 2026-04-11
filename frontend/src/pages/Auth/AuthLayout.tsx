import { useAuth } from '@/provider/auth-context'
import { Loader } from 'lucide-react';
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin w-8 h-8" />
            </div>
        );
    }

    // Already logged in — send to dashboard instead of showing auth pages
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />;

}

export default AuthLayout