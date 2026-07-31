import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import WorkspaceAvatar from '@/components/workspace/workspace-avatar';
import type { User, Workspace } from '@/types';
import { Plus, UserPlus } from 'lucide-react';

interface WorkspaceHeaderProps {
  workspace: Workspace;
  members: {
    _id: string;
    user: User;
    role: "admin" | "member" | "viewer" | "owner",
    joinedAt: Date;
  }[];
  onCreateProject: () => void;
  onInviteMember: () => void;
}

const WorkspaceHeader = ({
  workspace,
  members,
  onCreateProject,
  onInviteMember,
}: WorkspaceHeaderProps) => {
  return (
    <div className='space-y-8' >
      <div className='space-y-3' >
        <div className='flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3' >
          <div className='flex md:items-center gap-3' >
            {
              workspace.color && (
                <WorkspaceAvatar color={workspace.color} name={workspace.name} />
              )
            }

            <h2 className='text-xl md:text-2xl font-semibold' >
              {
                workspace.name
              }
            </h2>
          </div>

          <div className='text-xl flex items-center gap-3 justify-between md:justify-start mb-4  md:mb-0 ' >
            <Button variant={'outline'} onClick={onInviteMember} className='cursor-pointer'>
              <UserPlus className='size-4 mr-2' />
              Invite
            </Button>
            <Button onClick={onCreateProject} >
              <Plus className='mr-2 size-4' />
              Create Project
            </Button>
          </div>
        </div>
        {
          workspace.description && (
            <p className='text-sm md:text-base text-muted-foreground' >
              {
                workspace.description
              }
            </p>
          )
        }
      </div>
      {
        members.length > 0 && (
          <div className='flex items-center gap-2' >
            <span className='text-sm text-muted-foreground' >Members</span>
            <div className='flex space-x-2' >
              {
                members.map((member) => {
                  const rawFullName =
                    member?.user && typeof member.user === 'object'
                      ? member.user.fullName
                      : undefined;
                  const fullName =
                    typeof rawFullName === 'string' && rawFullName.trim().length > 0
                      ? rawFullName.trim()
                      : 'Unknown User';
                  const initial = fullName[0]?.toUpperCase() || 'U';

                  return (
                    <Avatar
                      key={member._id}
                      className='realtive h-8 w-8 rounded-full border-2 border-background overflow-hidden'
                      title={fullName}
                    >
                      <AvatarImage
                        src={member.user?.profilePicture}
                        alt={fullName}
                      />

                      <AvatarFallback>{initial}</AvatarFallback>

                    </Avatar>
                  );
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WorkspaceHeader