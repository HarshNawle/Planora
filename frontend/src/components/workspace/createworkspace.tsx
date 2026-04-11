import { workspaceSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form } from 'react-router-dom';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

interface CreateWorkspaceProps {
    isCreatingWorkspace: boolean;
    setIsCreatingWorkspace: (isCreatingWorkspace: boolean) => void;
}

type WorkspaceForm = z.infer<typeof workspaceSchema>;

export const colorOption = [
    "#FF5733", // Red-Orange
    "#33C1FF", //Blue
    "#28A745", // Green
    "#FFC300", // Yellow
    "#8E44AD", // Purple
    "#E67E22", // Orange
    "#2ECC71", // Light Green
    "#34495E", // Navy 
]

const CreateWorkspace = ({
    isCreatingWorkspace,
    setIsCreatingWorkspace
}: CreateWorkspaceProps) => {

        const form = useForm<WorkspaceForm> ( {
            resolver: zodResolver(workspaceSchema),
            defaultValues: {
                name: "",
                color: colorOption[0],
                description: ""
            }
        });

        const onSubmit = (data: WorkspaceForm) => {
            console.log(data);
        }

    return (
        <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace} >
            <DialogContent className='max-h-[80vh] overflow-y-auto' >
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Workspace Name' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>

                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkspace