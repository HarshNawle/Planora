import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useGetMyTasksQuery } from '@/hooks/use-task';
import type { Task } from '@/types';
import { Filter, Loader, SortAsc } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const MyTasks = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialFilter = searchParams.get("filter") || "all"
    const initialSort = searchParams.get("sort") || "desc"
    const initialSearch = searchParams.get("search") || ""

    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(initialSort === "asc" ? "asc" : "desc");
    const [filter, setFilter] = useState<string>(initialFilter);
    const [search, setSearch] = useState<string>(initialSearch);

    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        params.filter = filter;
        params.sort = sortDirection;
        params.search = search;

        setSearchParams(params, { replace: true })
    }, [filter, sortDirection, search]);

    useEffect(() => {
        const urlFilter = searchParams.get("filter") || "all";
        const urlSort = searchParams.get("sort") || "desc";
        const urlSearch = searchParams.get("serach") || "";

        if (urlFilter !== filter) setFilter(urlFilter);
        if (urlSort !== sortDirection) setSortDirection(urlSort === "asc" ? "asc" : "desc");
        if (urlSearch !== search) setSearch(urlSearch);
    }, [searchParams]);

    const { data: myTasks, isLoading } = useGetMyTasksQuery() as {
        data: Task[];
        isLoading: boolean;
    };


    const filteredTasks = myTasks?.length > 0 ?
        myTasks.filter((task) => {
            if (filter === "all") return true;
            else if (filter === "todo") return task.status === "To Do";
            else if (filter === "inprogress") return task.status === "In Progress";
            else if (filter === "done") return task.status === "Done";
            else if (filter === "archived") return task.isArchived === true;
            else if (filter === "high") return task.priority === "High";

            return true;

        }).filter(
            (task) => task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description?.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    // Sort Task
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (a.dueDate && b.dueDate) {
            return sortDirection === "asc"
                ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }

        return 0;
    })

    if (isLoading)
        return (
            <div>
                <Loader />
            </div>
        );

    return (
        <div className=''>
            <div className='flex items-start md:items-center justify-between'>
                <h1 className='text-2xl font-bold'>My Tasks</h1>

                <div className='flex flex-col gap-2 items-start md:flex-row'>
                    <Button
                        variant={'outline'}
                        onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                    >
                        {
                            sortDirection === "asc" ? "Oldest First" : "Newest First"
                        }
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'}>
                                <Filter className='size-4' /> Filter
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
                            <Separator />
                            <DropdownMenuItem onClick={() => setFilter("all")}>All Tasks</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("todo")}>To Do</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("inprogress")}>In Progress</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("done")}>Done</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("archived")}>Archived</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("high")}>High</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default MyTasks