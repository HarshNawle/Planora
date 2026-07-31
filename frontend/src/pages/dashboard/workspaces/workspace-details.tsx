import { useGetWorkspaceQuery } from '@/hooks/use-workspace';
import type { Project, Workspace } from '@/types';
import { Loader } from 'lucide-react';
import WorkspaceHeader from './workspace-header';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProjectList from './project-list';
import CreateProjectDialog from '@/pages/project/create-project';
import InvitedMemberDialog from '@/components/workspace/invite-member-dialog';

const WorkspaceDetails = () => {
  const { workspaceId } = useParams<{ workspaceId: any }>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);

    const { data, isLoading } = useGetWorkspaceQuery(workspaceId) as {
      data: {
        workspace: Workspace,
        projects: Project[]
      } | undefined;
      isLoading: boolean
    };

    if (!workspaceId) {
      return <div>No workspace found</div>;
    }

    if (isLoading) {
      return (
        <div>
          <Loader/>
        </div>
      )
    }

    if (!data) {
      return <div>No workspace found</div>;
    }

  return (
    <div className='space-y-8' >
      <WorkspaceHeader
        workspace={data.workspace}
        members={data?.workspace?.members as any }
        onCreateProject={() => setIsCreateProject(true) }
        onInviteMember={() => setIsInviteMember(true) }
      />

    <ProjectList
      workspaceId={workspaceId}
      projects={data.projects}
      onCreateProject={() => setIsCreateProject(true)}
    />

    <CreateProjectDialog
      isOpen={isCreateProject}    
      onOpenChange={setIsCreateProject}
      workspaceId={workspaceId}
      workspaceMembers={data.workspace.members as any}
    />

    <InvitedMemberDialog
      isOpen={isInviteMember}
      onOpenChange={setIsInviteMember}
      workspaceId={workspaceId}
    />

    </div>
  )
}

export default WorkspaceDetails