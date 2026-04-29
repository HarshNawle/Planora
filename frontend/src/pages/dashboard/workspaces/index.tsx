import { Button } from '@/components/ui/button';
import CreateWorkspace from '@/components/workspace/createworkspace';
import { useGetWorkSpaceQuery } from '@/hooks/use-workspace';
import type { Workspace } from '@/types';
import { Loader, PlusCircle } from 'lucide-react';
import { useState } from 'react';

const Workspaces = () => {
    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

    const { data: workspaces, isLoading } = useGetWorkSpaceQuery() as {
        data: Workspace[];
        isLoading: boolean;
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl md:text-3xl font-bold'>Workspaces</h2>
                    <Button onClick={() => setIsCreatingWorkspace(true)} className='bg-gray-700' >
                        <PlusCircle className='size-4 mr-2' />
                        New Workspace
                    </Button>
                </div>

                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3' >
                    {
                        workspaces.map((ws) => (
                            <WorkspaceCard key={ws._id} workspace={ws} />
                        ))
                    }

                    {
                        workspaces.length === 0 && <NoDataFound/>
                    }
                </div>
            </div>

            <CreateWorkspace
                isCreatingWorkspace={isCreatingWorkspace}
                setIsCreatingWorkspace={setIsCreatingWorkspace}
            />
        </>
    );
};

const WorkspaceCard = ({ workspace } : { workspace: Workspace }) => {
    return (
        <div className='bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300' >
            <h3 className='font-semibold text-lg' >{ workspace.name }</h3>
        </div>
    )
}

export default Workspaces;