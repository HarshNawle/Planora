export const SELECTED_WORKSPACE_KEY = "planora-selected-workspace-id";

export const getStoredWorkspaceId = () =>
    localStorage.getItem(SELECTED_WORKSPACE_KEY);

export const setStoredWorkspaceId = (workspaceId: string) => {
    localStorage.setItem(SELECTED_WORKSPACE_KEY, workspaceId);
};

export const getWorkspaceIdFromLocation = (
    pathname: string,
    searchParams: URLSearchParams
) => {
    const fromQuery = searchParams.get("workspaceId");
    if (fromQuery) return fromQuery;

    const pathMatch = pathname.match(/^\/workspaces\/([^/]+)/);
    if (pathMatch?.[1]) return pathMatch[1];

    return getStoredWorkspaceId();
};
