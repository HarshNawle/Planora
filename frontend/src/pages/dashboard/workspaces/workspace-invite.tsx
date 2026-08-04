import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAcceptGenerateInviteMutation, useGetWorkspaceDetailsQuery } from '@/hooks/use-workspace';
import type { Workspace } from '@/types';
import { Loader } from 'lucide-react';
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const WorkspaceInvite = () => {
    const { workspaceId } = useParams();
    const { searchParams } = useSearchParams();

    const token = searchParams.get("tk");

    const navigate = useNavigate();

    const { data: workspace, isLoading } = useGetWorkspaceDetailsQuery(workspaceId!) as { data: Workspace; isLoading: boolean };

    const {
        mutate: acceptInviteByToken,
        isPending: isAcceptGenerateInvitePending
    } = useAcceptGenerateInviteMutation();

    if (isLoading) {
        return (
            <div className='flex w-full h-screen items-center justify-center'>
                <Loader />
            </div>
        )
    }

    if (!workspaceId) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Card className='max-w-md'>
                    <CardHeader>
                        <CardTitle>Invalid Invitation</CardTitle>
                        <CardDescription>
                            This workspace invitation is invalid or has expired
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => navigate("/workspaces")} className='w-full' >
                            Go to Workspaces
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div>WorkspaceInvite</div>
    )
}

export default WorkspaceInvite