import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGetMyTasksQuery } from '@/hooks/use-task';
import type { Task } from '@/types';
import { format } from 'date-fns';
import { ArrowUpRight, CheckCircle, Loader } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Archived = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialSearch = searchParams.get("search") || ""

    const [search, setSearch] = useState<string>(initialSearch);

    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        params.search = search;

        setSearchParams(params, { replace: true })
    }, [search]);

    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        if (urlSearch !== search) setSearch(urlSearch);
    }, [searchParams]);

    const { data: myTasks, isLoading } = useGetMyTasksQuery() as {
        data: Task[];
        isLoading: boolean;
    };

    const archivedTasks = myTasks?.length > 0 ?
        myTasks.filter((task) => task.isArchived === true).filter(
            (task) => task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description?.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="h-8 w-8 animate-spin" />
            </div>
        );

    return (
        <div className='space-y-6'>
            <div className='flex items-start md:items-center justify-between'>
                <h1 className='text-2xl font-bold'>Archived Tasks</h1>
            </div>

            <Input
                placeholder='Search archived tasks...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='max-w-md'
            />

            <Card>
                <CardHeader>
                    <CardTitle>Archived Tasks</CardTitle>
                    <CardDescription>
                        {archivedTasks?.length} archived tasks
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className='divide-y'>
                        {
                            archivedTasks?.map((task) => (
                                <div key={task._id} className='p-4 hover:bg-muted/50'>
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-start">
                                        <div className='flex'>
                                            <div className='flex gap-2 mr-2'>
                                                <CheckCircle className='size-4 text-green-500' />
                                            </div>

                                            <div>
                                                <Link to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                                                    className='flex items-center font-medium hover:text-primary hover:underline transition-colors'
                                                >
                                                    {task.title}
                                                    <ArrowUpRight className='size-4 ml-1' />
                                                </Link>
                                                <div className='flex items-center space-x-2 mt-1'>
                                                    <Badge variant="default">
                                                        {task.status}
                                                    </Badge>

                                                    {
                                                        task.priority && (
                                                            <Badge variant={
                                                                task.priority === "High"
                                                                    ? "destructive"
                                                                    : "secondary"
                                                            }>
                                                                {task.priority}
                                                            </Badge>
                                                        )
                                                    }
                                                    <Badge variant={"outline"}>
                                                        Archived
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='text-sm text-muted-foreground space-y-1'>
                                            {
                                                task.dueDate && (
                                                    <div>Due: {format(task.dueDate, "PPPP")}</div>
                                                )
                                            }

                                            <div>
                                                Project:{" "}
                                                <span className='font-medium'>
                                                    {task.project.title}
                                                </span>
                                            </div>

                                            <div>
                                                Modified on: {format(task.updatedAt, "PPPP")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {
                            archivedTasks.length === 0 && (
                                <div className='p-4 text-center text-sm text-muted-foreground'>
                                    No archived tasks found
                                </div>
                            )
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Archived