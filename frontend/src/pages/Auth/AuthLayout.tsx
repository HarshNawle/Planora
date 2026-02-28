import { useAuth } from '@/provider/auth-context'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div>
            AuthLayout
            <Outlet />
        </div>
    )
}

export default AuthLayout