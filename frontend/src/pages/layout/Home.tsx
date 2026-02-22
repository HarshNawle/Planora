import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-full h-full flex items-center justify-center gap-2' >
      <Link to="/auth/sign-up" >
        <Button className='bg-blue-500 text-white' >Signup</Button>
      </Link>
      <Link to="/auth/login" >
        <Button variant={'outline'} className='bg-blue-500 text-white' >Login</Button>
      </Link>
    </div>
  )
}

export default Home