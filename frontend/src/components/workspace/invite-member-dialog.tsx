import { inviteMemberSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Form } from 'react-router-dom';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface InvitedMemberDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    workspaceId: string;

};

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>
const ROLES = ["admin", "member", "viewer"] as const;

const InvitedMemberDialog = ({
    isOpen,
    onOpenChange,
    workspaceId
}: InvitedMemberDialogProps) => {

    const [inviteTab, setInviteTab] = useState("email");
    const [linkCopied, setLinkCopied] = useState(false);

    const form = useForm<InviteMemberFormData>({
        resolver: zodResolver(inviteMemberSchema),
        defaultValues: {
            email: "",
            role: "member",
        }
    });

    const onSubmit = async (data: InviteMemberFormData) => {
        console.log(data);
    }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Invite to Workspace</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="email" value={inviteTab} onValueChange={setInviteTab}>
                <TabsList>
                    <TabsTrigger value="email">Send Email</TabsTrigger>
                    <TabsTrigger value="link">Share Link</TabsTrigger>
                </TabsList>

                <TabsContent value="email" >
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className='flex flex-col space-y-6 w-full'>
                                        <FormField 
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Adress</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Select Role</FormLabel>
                                                    <FormControl>
                                                        <div className='flex flex-wrap gap-3'>
                                                            {
                                                                ROLES.map((role) => (
                                                                    <label key={role} className='flex items-center gap-2 cursor-pointer'>
                                                                        <input
                                                                            type='radio'
                                                                            value={role}
                                                                            className='peer hidden'
                                                                            checked={field.value === role}
                                                                            onChange={() => field.onChange(role)}
                                                                        />
                                                                        <span
                                                                            className={cn(
                                                                                "size-7 rounded-full border-2 border-blue-300 flex items-center justify-center transition-all duration-300 hover:shadow-lg",
                                                                                field.value === role && "ring-2 ring-blue-500 ring-offset-2"
                                                                            )}
                                                                        >
                                                                            {
                                                                                field.value === role && (
                                                                                    <span className='size-3 rounded-full bg-blue-300' />
                                                                                )
                                                                            }
                                                                        </span>
                                                                        <span className='capitalize'>{role}</span>
                                                                    </label>
                                                                ))
                                                            }
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </DialogContent>
    </Dialog>
  )
}

export default InvitedMemberDialog