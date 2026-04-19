import { workspaceSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useCreateWorkspace } from '@/hooks/use-workspace';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CreateWorkspaceProps {
    isCreatingWorkspace: boolean;
    setIsCreatingWorkspace: (isCreatingWorkspace: boolean) => void;
}


export const colorOptions = [
    "#28A745", // Green
    "#2ECC71", // Light Green
    "#FF5733", // Red-Orange
    "#33C1FF", // Blue
    "#FFC300", // Yellow
    "#8E44AD", // Purple
    "#E67E22", // Orange
    "#34495E", // Navy 
]

export type WorkspaceForm = z.infer<typeof workspaceSchema>;

const CreateWorkspace = ({
    isCreatingWorkspace,
    setIsCreatingWorkspace
}: CreateWorkspaceProps) => {


    const form = useForm<WorkspaceForm>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
            color: colorOptions[0],
            description: ""
        }
    });
    const { mutate, isPending } = useCreateWorkspace();
    const navigate = useNavigate();

    const onSubmit = (data: WorkspaceForm) => {
        mutate(data, {
            onSuccess: (data: any) => {
                form.reset();
                setIsCreatingWorkspace(false);
                toast.success("Workspace created successfully");
                navigate(`/workspaces/${data._id}`);
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return (
        <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace} >
            <DialogContent className='max-h-[80vh] overflow-y-auto' >
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                    <DialogDescription>
                        Make your own Workspace
                    </DialogDescription>
                </DialogHeader>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className='space-y-4 py-4' >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Workspace Name' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder='Workspace Description'
                                                rows={3}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <div className='flex gap-3'>
                                                {
                                                    colorOptions.map((color) => (
                                                        <div
                                                            key={color}
                                                            onClick={() => field.onChange(color)}
                                                            className={cn('w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300',
                                                                field.value === color && "ring-2 ring-offset-2 ring-blue-500"
                                                            )}
                                                            style={{ backgroundColor: color }}
                                                        >
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type={'submit'} disabled={isPending} >
                                {
                                    isPending ? "Creating..." : "Create"
                                }
                            </Button>
                        </DialogFooter>
                    </form>

                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkspace