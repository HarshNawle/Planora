import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {  CheckCircle, Loader, XCircle } from "lucide-react"
import { Button } from '@/components/ui/button';
const VerifyEmail = () => {
    // useSearchParams() is a hook that lets you access and modify the query 
    // parameters in the browser URL.

    // Example URL:
    // http://localhost:5173/products?category=mobile&page=2

    // Here:
    // category=mobile
    // page=2
    const [searchParams] = useSearchParams();

    const [isSuccess, setIsSuccess] = useState(false);
    const isVerifying = false;

    useEffect(() => {
        const token = searchParams.get("token");

        if(!token) {
            setIsSuccess(false);
        } else {
            setIsSuccess(true);
        }
    }, [searchParams]);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Verify Email</h1>
            <p className='text-sm text-gray-500 my-2'>Verifying your email...</p>

            <Card className='w-full max-w-md'>
                {/* <CardHeader>
                    <Link to="/login" className='flex items-center gap-2'>
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        <p className='hover:underline' >Back to Login</p>
                    </Link>
                </CardHeader> */}

                <CardContent>
                  <div className='flex flex-col items-center justify-center py-4'>
                    {
                      isVerifying ? (
                        <>
                          <Loader className='w-10 h-10 text-gray-500 animate-spin' />
                          <h3 className='text-lg font-semibold'>Verifying email...</h3>
                          <p className='text-sm text-gray-500' >
                            Please wait while we verify your email.
                          </p> 

                          <Link to="/login" className='text-sm text-blue-500 mt-4' >
                            <Button variant="outline" >Back to Login</Button>
                          </Link>
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className='w-10 h-10 text-green-500' />
                          <h3 className='text-lg font-semibold' >Email Verified</h3>
                          <p className='text-sm text-gray-500'>
                            Your email has been verified successfully.
                          </p>
                          <Link to="/login" className='text-sm text-blue-500 mt-4' >
                            <Button variant="outline" >Back to Login</Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <XCircle className='w-10 h-10 text-red-500' />
                          <h3 className='text-lg font-semibold' >Email Verification Failed</h3>
                          <p className='text-sm text-gray-500'>
                            Your email verification failed. Please try again.
                          </p>

                          <Link to="/login" className='text-sm text-blue-500 mt-4' >
                            <Button variant="outline" >Back to Login</Button>
                          </Link>
                        </>
                      )
                    }
                  </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default VerifyEmail