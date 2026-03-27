import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { resetPasswordSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod'

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);

  // const { mutate, isPending } = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",

    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-md space-y-6'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-2xl font-bold'>Reset Password</h1>
          <p className='text-muted-foreground'>Enter your password</p>
        </div>

        <Card>
          <CardHeader>
            <Link to="/login">
              <ArrowLeft className='w-4 h-4' />
              <span>Back to login</span>
            </Link>
          </CardHeader>

          <CardContent>
            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword;