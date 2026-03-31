import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResetPasswordMutation } from '@/hooks/use-auth';
import { resetPasswordSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod'

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",

    },
  });

  const onSubmit = (values: ResetPasswordFormData) => {
    if(!token) {
      toast.error("Invalid token");
      return;
    }

    resetPassword(
      { ...values, token: token as string },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ message?: string }>;
          const errorMessage = axiosError.response?.data?.message;
          toast.error(errorMessage);
          console.log(error);
        }
      }
    )
    
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-md space-y-6'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-2xl font-bold'>Forgot Password</h1>
          <p className='text-muted-foreground'>Enter your email to reset your password</p>
        </div>

        <Card>
          <CardHeader>
            <Link to="/auth/login" className='flex items-center gap-2'>
              <ArrowLeft className='w-4 h-4'/>
              <span>Back to login</span>
            </Link>
          </CardHeader>

          <CardContent>
            {
              isSuccess ? (
                <div className='flex flex-col items-center justify-center'>
                  <CheckCircle className='w-10 h-10 text-gray-500' />
                  <h1 className='text-2xl font-bold'>Reset Password</h1>
                  <p className='text-muted-foreground'>Enter your password below</p>
                </div>
              ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-4'>
                      <FormField
                        name='newPassword'
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="New Password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name='confirmPassword'
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Confirm Password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type='submit' className='w-full cursor-pointer' disabled={isPending} >
                        { isPending ? (
                          <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                          "Reset Password"
                        )
                      }
                      </Button>
                    </form>
                  </Form>
              )
            }
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword;