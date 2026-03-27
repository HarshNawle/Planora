import { Button } from '@/components/ui/button'
import { useAuth } from '@/provider/auth-context';
import React from 'react'

const DashBoardLayout = () => {

    const { user, logout } = useAuth();
  return (
    <div className='flex items-center justify-center'>
        <Button onClick={logout} className='cursor-pointer' >Logout</Button>
    </div>
  )
}

export default DashBoardLayout