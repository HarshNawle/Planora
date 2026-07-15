import { RecentProjects } from '@/components/dashboard/recent-projects';
import StatisticsCharts from '@/components/dashboard/statistics-charts';
import StatsCard from '@/components/dashboard/stats-card';
import { UpcomingTasks } from '@/components/dashboard/upcoming-tasks';
import { useGetWorkspaceStatsQuery } from '@/hooks/use-workspace';
import type { Project, ProjectStatusData, StatsCardProps, Task, TaskPriorityData, TaskTrendsData, WorkspaceProductivityData } from '@/types';
import { Loader, AlertTriangle } from 'lucide-react';
import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const workspaceId = searchParams.get("workspaceId");

  const { data, isPending, isError, error } = useGetWorkspaceStatsQuery(workspaceId) as {
    data: {
      stats: StatsCardProps,
      taskTrendsData: TaskTrendsData[],
      projectStatusData: ProjectStatusData[],
      taskPriorityData: TaskPriorityData[],
      workspaceProductivityData: WorkspaceProductivityData[],
      upcomingTasks: Task[],
      recentProjects: Project[];
    };
    isPending: boolean;
    isError: boolean;
    error: Error;
  };

  if (!workspaceId) {
    return (
      <div className='flex flex-col items-center justify-center h-64 text-center'>
        <h2 className='text-xl font-bold mb-2'>No Workspace Selected</h2>
        <p className='text-gray-600 mb-4'>Please select a workspace to view the dashboard.</p>
        <button
          onClick={() => navigate('/workspaces')}
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
        >
          Select Workspace
        </button>
      </div>
    )
  }

  if (isPending) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard';
    const isForbidden = errorMessage.includes('403') || errorMessage.includes('Forbidden');

    if (isForbidden) {
      return (
        <div className='flex flex-col items-center justify-center h-64 text-center'>
          <AlertTriangle className='text-red-500 size-12 mb-4' />
          <h2 className='text-xl font-bold mb-2'>Access Denied</h2>
          <p className='text-gray-600 mb-4'>You don't have access to this workspace.</p>
          <button
            onClick={() => navigate('/workspaces')}
            className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
          >
            Select Workspace
          </button>
        </div>
      )
    }

    return (
      <div className='flex flex-col items-center justify-center h-64 text-center'>
        <AlertTriangle className='text-red-500 size-12 mb-4' />
        <h2 className='text-xl font-bold mb-2'>Error Loading Dashboard</h2>
        <p className='text-gray-600'>{errorMessage}</p>
      </div>
    )
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div className='space-y-8 2xl:space-y-12'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-2xl'>Dashboard</h1>
      </div>

      <StatsCard data={data.stats} />
      <StatisticsCharts
        stats={data.stats} 
        taskTrendsData={data.taskTrendsData}  
        projectStatusData={data.projectStatusData}  
        taskPriorityData={data.taskPriorityData}  
        workspaceProductivityData={data.workspaceProductivityData}  
      />

      <div className='grid gap-6 lg:grid-cols-2'>
        <RecentProjects data={data.recentProjects} />
        <UpcomingTasks data={data.upcomingTasks} />
      </div>
    </div>
  )
}

export default DashBoard