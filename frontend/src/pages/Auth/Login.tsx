import { logInSchema } from "@/lib/schema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";

type SigninFormData = z.infer<typeof logInSchema>

const Login = () => {
    const form = useForm<SigninFormData>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleOnSubmit = (values: SigninFormData) => {
        console.log(values);

    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-4" >
            <GravityStarsBackground mouseGravity="repel" starsInteraction={true}
                className="absolute -z-10 inset-0 flex items-center justify-center rounded-xl" />
            <Card className="max-w-md w-full shadow-xl" >
                <CardHeader className="text-center mb-5" >
                    <CardTitle className="text-2xl font-bold" >Welcome Back</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2" >
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(handleOnSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name='email'
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="email@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between">
                                                <FormLabel>Password</FormLabel>
                                                <Link to={"/auth/forgot-password"} className="text-sm text-blue-600" > 
                                                    Forgot password?
                                                </Link>
                                                
                                            </div>
                                            <FormControl>
                                                <Input type="password" placeholder="*******" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />

                            <Button type="submit" className="w-full cursor-pointer">
                                Login
                            </Button>
                        </form>
                    </Form>

                    <CardFooter className="flex justify-center">
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account? {" "}
                                <Link to={"/auth/sign-up"} className="border-b-2" >Signup</Link>
                            </p>
                        </div>
                    </CardFooter>

                </CardContent>
            </Card>
        </div>
    )
}

export default Login