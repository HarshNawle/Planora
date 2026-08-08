import NoDataFound from '@/components/workspace/nodata-found';
import ProjectCard from '@/pages/project/project-card';
import { getProjectProgress } from '@/lib';
import type { Project } from '@/types';
interface ProjectListProps {
  workspaceId: string;
  projects: Project[];
  onCreateProject: () => void;
}

const ProjectList = ({ workspaceId, projects, onCreateProject }: ProjectListProps) => {
  return (
    <div>
      <h3 className='font-medium mb-4 text-xl' >Projects</h3>
      <div>
        {
          projects.length === 0 ? (
            <NoDataFound
              title='No projects found'
              description='Create a project to get start'
              buttonText='Create Project'
              buttonAction={onCreateProject}
            />
          ) : (
            (
              <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {projects.map((project) => {
                  const projectProgress = getProjectProgress(project.tasks);

                  return (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      progress={projectProgress}
                      workspaceId={workspaceId}
                    />
                  );
                })}
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default ProjectList