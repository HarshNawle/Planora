import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProject } from '@/hooks/use-project';
import { projectSchema } from '@/lib/schema';
import { ProjectStatus, type MembersProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { check, z } from 'zod';

interface CreateProjectDialogProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    workspaceId: string;
    workspaceMembers: MembersProps[];
}

export type CreateProjectFormData = z.infer<typeof projectSchema>;

const CreateProjectDialog = ({
    isOpen,
    onOpenChange,
    workspaceId,
    workspaceMembers
}: CreateProjectDialogProps ) => {

    const form = useForm<CreateProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            status: ProjectStatus.PLANNING,
            startDate: "",
            dueDate: "",
            members: [],
            tags: undefined,
        },
    });

    const { mutate, isPending } = useCreateProject();

    const onSubmit = (values: CreateProjectFormData) =>{
        if(!workspaceId) return;

        mutate(
            {
                projectData: values,
                workspaceId
            },
            {
                onSuccess: () => {
                    toast.success("Project created successfully");
                    form.reset();
                    onOpenChange(false)
                },
                onError: (error: any) => {
                    const errorMessage = error.respsonse.data.message;
                    toast.error(errorMessage);
                    console.log(error);
                }
            }
        );
    };
    
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
        <DialogContent className='sm:mx-w-[540px]' >
            <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
                <DialogDescription>Create a new project to get started</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5' >
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Project Title' />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder='Project Description' rows={3} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange} >
                                        <SelectTrigger className='w-full' >
                                            <SelectValue placeholder="Select Project Status" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {
                                                Object.values(ProjectStatus).map((status) => (
                                                    <SelectItem key={status} value={status} >
                                                        {status}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className='grid grid-col-1 md:grid-cols-2  gap-4'>
                        <FormField
                            control={form.control}
                            name='startDate'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Popover modal={true}>
                                            <PopoverTrigger asChild >
                                                <Button 
                                                    variant={"outline"}
                                                    className={"w-full justify-start text-left font-medium" +
                                                        (!field.value ? "text-muted-foreground" : "")
                                                    }
                                                >
                                                    <CalendarIcon className='size-4 mr-2' />
                                                    {
                                                        field.value ? (
                                                            format(new Date(field.value), "PPPP")
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )
                                                    }
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => {
                                                            field.onChange(date?.toISOString() || undefined)
                                                        }}
                                                    />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='dueDate'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                        <Popover modal={true}>
                                            <PopoverTrigger asChild >
                                                <Button 
                                                    variant={"outline"}
                                                    className={"w-full justify-start text-left font-medium" +
                                                        (!field.value ? "text-muted-foreground" : "")
                                                    }
                                                >
                                                    <CalendarIcon className='size-4 mr-2' />
                                                    {
                                                        field.value ? (
                                                            format(new Date(field.value), "PPPP")
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )
                                                    }
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => {
                                                            field.onChange(date?.toISOString() || undefined)
                                                        }}
                                                    />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                    </div>

                    <FormField
                        control={form.control}
                        name='tags'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Tags separated by comma'
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='members'
                        render={({ field }) => {
                            const selectedMembers = field.value || [];

                            return (
                                <FormItem>
                                    <FormLabel>Members</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} 
                                                    className='w-full justify-start text-left font-normal min-h-11'
                                                >
                                                    {
                                                        selectedMembers.length===0 ? (
                                                            <span className='text-muted-foreground'>Select Members</span>
                                                        ) : selectedMembers.length <=2 ? (
                                                                selectedMembers.map((m) => {
                                                                    const members = workspaceMembers.find(
                                                                        (wm) => wm.user._id == m.user
                                                                    );

                                                                    return `${members?.user.fullName} (${members?.role})`

                                                                })
                                                        ) : (
                                                            `${selectedMembers.length} members selected`
                                                        )
                                                    }
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className='w-sm max-w-60 overflow-y-auto' align='start' >
                                                    <div className='flex flex-col gap-2' >
                                                        { workspaceMembers.map((member) => {
                                                            const selectedMember = selectedMembers.find(
                                                                (m) => m.user === member.user._id
                                                            );

                                                            return (
                                                                <div key={member._id}
                                                                    className='flex items-center p-2 gap-2 rounded border'
                                                                >
                                                                    <Checkbox
                                                                        checked={!!selectedMember}
                                                                        onCheckedChange={(checked) => {
                                                                            if(checked) {
                                                                                field.onChange([...selectedMembers, {user: member.user._id, role:"contributor"}])
                                                                            }
                                                                            else {
                                                                                field.onChange(selectedMembers.filter((m) => m.user !== member.user._id))
                                                                            }

                                                                        }}
                                                                        id = {`member-${member.user._id}`}
                                                                    />

                                                                   <span className='truncate flex-1'>
                                                                    {
                                                                        member.user.fullName
                                                                    }
                                                                   </span>

                                                                   {
                                                                    selectedMember && (
                                                                        <Select
                                                                            value={selectedMember.role}
                                                                            onValueChange={(role) => {
                                                                                field.onChange(
                                                                                    selectedMembers.map((m) => 
                                                                                        m.user === member.user._id ? {
                                                                                            ...m,
                                                                                            role: role as | "contributor" | "viewer" | "manager"
                                                                                        } : m
                                                                                    )
                                                                                );
                                                                            }}  
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select Role" />
                                                                            </SelectTrigger>

                                                                            <SelectContent>
                                                                                <SelectGroup>
                                                                                    <SelectItem value='manager' >Manager</SelectItem>
                                                                                    <SelectItem value='contributor' >Contributor</SelectItem>
                                                                                    <SelectItem value='viewer' >Viewer</SelectItem>
                                                                                </SelectGroup>
                                                                            </SelectContent>

                                                                        </Select>
                                                                    )
                                                                   }
                                                                </div>
                                                            )
                                                        }) }
                                                    </div>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />

                    <DialogFooter>
                        <Button type='submit' disabled={isPending} >
                            {isPending ? "Creating..." : "Create Project"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>

        </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog