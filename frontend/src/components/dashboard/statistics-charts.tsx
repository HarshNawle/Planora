import type { ProjectStatusData, StatsCardProps, TaskPriorityData, TaskTrendsData, WorkspaceProductivityData } from '@/types';
import React from 'react'

interface StatisticsChartsProps {
    stats: StatsCardProps;
    taskTrendsData: TaskTrendsData[];
    projectStatusData: ProjectStatusData[];
    taskPriorityData: TaskPriorityData[];
    workspaceProductivityData: WorkspaceProductivityData[];
}

const StatisticsCharts = ({
    stats,
    taskTrendsData,
    projectStatusData,
    taskPriorityData,
    workspaceProductivityData
}: StatisticsChartsProps) => {
    return (
        <div>
            
        </div>
    )
}

export default StatisticsCharts