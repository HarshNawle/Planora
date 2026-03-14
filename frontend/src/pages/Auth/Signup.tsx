import { signupSchema } from "@/lib/schema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { useSignupMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

export type SignupFormData = z.infer<typeof signupSchema>

const Signup = () => {
    const navigate = useNavigate();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            fullName: ""
        },
    });

    const { mutate, isPending } = useSignupMutation();

    const handleOnSubmit = (values: SignupFormData) => {
        mutate(values, {
            onSuccess: () => {
                toast.success("Email Verification Required", {
                    description: "Please check your email for verification link. If you don't see it, please check your spam folder."
                });

                form.reset();
                navigate("/login")
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || "An error occured";
                console.log(error);
                
                toast.error(errorMessage);
            }
        });
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-4" >
            <GravityStarsBackground mouseGravity="repel" starsInteraction={true}
                className="absolute -z-10 inset-0 flex items-center justify-center rounded-xl" />
            <Card className="max-w-md w-full shadow-xl" >
                <CardHeader className="text-center mb-5" >
                    <CardTitle className="text-2xl font-bold" >Create Account</CardTitle>
                    <CardDescription>Sign up to continue</CardDescription>
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
                                name='fullName'
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="John Snow" {...field} />
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
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="*******" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="*******" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />

                            <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                                {isPending ? "Signing up..." : "Signup"}
                            </Button>
                        </form>
                    </Form>

                    <CardFooter className="flex justify-center">
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account? {" "}
                                <Link to={"/auth/login"} className="border-b-2" >Login</Link>
                            </p>
                        </div>
                    </CardFooter>

                </CardContent>
            </Card>
        </div>
    )
}

export default Signup