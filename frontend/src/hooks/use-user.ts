import { fetchData } from "@/lib/fetch-utils";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["user"];

export const useUserProfileQuery = () => {
    return useQuery(
        {
            queryKey,
            queryFn: () => fetchData("/users/profile"),
        }
    )
};

