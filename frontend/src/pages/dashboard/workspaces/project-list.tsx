import NoDataFound from '@/components/nodata-found';
import ProjectCard from '@/pages/project/project-card';
import type { Project } from '@/types';
interface ProjectListProps{
    workspaceId: string;
    projects: Project[];
    onCreateProject: () => void;
}

const ProjectList = ({ workspaceId, projects, onCreateProject } : ProjectListProps ) => {
  return (
    <div>
        <h3 className='font-medium mb-4 text-xl' >Projects</h3>
        <div className='grid gap-6' >
          {
            projects.length === 0 ? (
              <NoDataFound
                title='No projects found'
                description='Create a project to get start'
                buttonText='Create Project'
                buttonAction={onCreateProject}
              />
            ) : (
              projects.map((project) => {
                const projectProgress = 0;

                return (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    progress={projectProgress}
                    workspaceId={workspaceId}
                  />
                )
              })
            )
          }
        </div>
    </div>
  )
}

export default ProjectList