import type { ProjectStatusData, StatsCardProps, TaskPriorityData, TaskTrendsData, WorkspaceProductivityData } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartBarBig, ChartLine, ChartPie } from 'lucide-react';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';

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
    const projectStatusTotal = projectStatusData.reduce((sum, entry) => sum + entry.value, 0);
    const activeProjectStatusData = projectStatusData.filter((entry) => entry.value > 0);
    const taskPriorityTotal = taskPriorityData.reduce((sum, entry) => sum + entry.value, 0);
    const activeTaskPriorityData = taskPriorityData.filter((entry) => entry.value > 0);

    return (
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 *:min-w-0'>
            <Card className='lg:col-span-2 overflow-hidden'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <div className='space-y-0.5'>
                        <CardTitle className='text-base font-medium'>Task Trends</CardTitle>
                        <CardDescription>Daily task status changes</CardDescription>
                    </div>

                    <ChartLine className='size-5 text-muted-foreground' />

                </CardHeader>
                <CardContent className='w-full overflow-hidden text-muted-foreground'>
                    <ChartContainer
                            className='aspect-video h-55 w-full'
                            config={{
                                completed: { color: "#10b981" }, // green
                                inProgress: { color: "#f59e0b" }, // blue
                                todo: { color: "#3b82f6" }, // gray
                            }}
                        >
                            <LineChart data={taskTrendsData}>
                                <XAxis
                                    dataKey={"name"}
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <CartesianGrid strokeDasharray={"3 3"} vertical={false} />
                                <ChartTooltip />

                                <Line
                                    type="monotone"
                                    dataKey={"completed"}
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey={"inProgress"}
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey={"todo"}
                                    stroke="#6b7280"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />

                                <ChartLegend content={<ChartLegendContent />} />

                            </LineChart>
                        </ChartContainer>
                    <p className="border-t pt-2 text-xs text-muted-foreground mt-2">
                        {stats.totalTaskCompleted} of {stats.totalTasks} completed
                    </p>
                </CardContent>


            </Card>

            {/* Project Status */}
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-0.5">
                        <CardTitle className="text-base font-medium">
                            Project Status
                        </CardTitle>
                        <CardDescription>Project status breakdown</CardDescription>
                    </div>

                    <ChartPie className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent className="w-full overflow-hidden">
                    <div className="flex flex-col items-center gap-4">
                        {activeProjectStatusData.length > 0 ? (
                            <ChartContainer
                                className="mx-auto aspect-square h-[160px] w-[160px]"
                                config={{
                                    Completed: { label: "Completed", color: "#10b981" },
                                    "In Progress": { label: "In Progress", color: "#3b82f6" },
                                    Planning: { label: "Planning", color: "#f59e0b" },
                                }}
                            >
                                <PieChart>
                                    <Pie
                                        data={activeProjectStatusData}
                                        cx="50%"
                                        cy="50%"
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={45}
                                        outerRadius={65}
                                        paddingAngle={2}
                                        label={false}
                                    >
                                        {activeProjectStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip />
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <div className="flex h-[160px] w-[160px] items-center justify-center text-sm text-muted-foreground">
                                No project data
                            </div>
                        )}
                        <div className="w-full flex flex-col gap-1.5">
                            {projectStatusData.map((entry) => (
                                <div key={entry.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="h-2 w-2 shrink-0 rounded-[2px]"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-muted-foreground">{entry.name}</span>
                                    </div>
                                    <span className="font-medium tabular-nums">
                                        {entry.value}
                                        {projectStatusTotal > 0 && (
                                            <span className="font-normal text-muted-foreground">
                                                {" "}({Math.round((entry.value / projectStatusTotal) * 100)}%)
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="w-full border-t pt-2 text-xs text-muted-foreground">
                            {stats.totalProjects} projects · {stats.totalProjectInProgress} in progress
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* task priority  */}
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-0.5">
                        <CardTitle className="text-base font-medium">
                            Task Priority
                        </CardTitle>
                        <CardDescription>Task priority breakdown</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="w-full overflow-hidden">
                    <div className="flex flex-col items-center gap-4">
                        {activeTaskPriorityData.length > 0 ? (
                            <ChartContainer
                                className="mx-auto aspect-square h-[160px] w-[160px]"
                                config={{
                                    High: { label: "High", color: "#ef4444" },
                                    Medium: { label: "Medium", color: "#f59e0b" },
                                    Low: { label: "Low", color: "#6b7280" },
                                }}
                            >
                                <PieChart>
                                    <Pie
                                        data={activeTaskPriorityData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={65}
                                        paddingAngle={2}
                                        dataKey="value"
                                        nameKey="name"
                                        label={false}
                                    >
                                        {activeTaskPriorityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip />
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <div className="flex h-[160px] w-[160px] items-center justify-center text-sm text-muted-foreground">
                                No task data
                            </div>
                        )}
                        <div className="w-full flex flex-col gap-1.5">
                            {taskPriorityData.map((entry) => (
                                <div key={entry.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="h-2 w-2 shrink-0 rounded-[2px]"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-muted-foreground">{entry.name}</span>
                                    </div>
                                    <span className="font-medium tabular-nums">
                                        {entry.value}
                                        {taskPriorityTotal > 0 && (
                                            <span className="font-normal text-muted-foreground">
                                                {" "}({Math.round((entry.value / taskPriorityTotal) * 100)}%)
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="w-full border-t pt-2 text-xs text-muted-foreground">
                            {stats.totalTasks} tasks across all priorities
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Workspace Productivity Chart */}
            <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-0.5">
                        <CardTitle className="text-base font-medium">
                            Workspace Productivity
                        </CardTitle>
                        <CardDescription>Task completion by project</CardDescription>
                    </div>
                    <ChartBarBig className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="w-full overflow-hidden">
                    <ChartContainer
                        className="aspect-video h-[220px] w-full"
                        config={{
                            completed: { color: "#3b82f6" },
                            total: { color: "red" },
                        }}
                    >
                            <BarChart
                                data={workspaceProductivityData}
                                barGap={0}
                                barSize={20}
                            >
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar
                                    dataKey="total"
                                    fill="#000"
                                    radius={[4, 4, 0, 0]}
                                    name="Total Tasks"
                                />
                                <Bar
                                    dataKey="completed"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    name="Completed Tasks"
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </BarChart>
                        </ChartContainer>
                    <p className="border-t pt-2 text-xs text-muted-foreground mt-2">
                        {stats.totalTaskCompleted} completed · {stats.totalTaskInProgress} in progress · {stats.totalTaskToDo} to do
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatisticsCharts