
export interface ListParams {
    page: number;
    pageSize: number;
    filters?: Record<string, any>;
    sort?: {
        field: string;
        direction: SortDirection;
    };
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
}

export interface UseListOptions<T> {
    fetchData: (params: ListParams) => Promise<PaginatedResponse<T>>;
    initialPage?: number;
    pageSize?: number;
    initialFilters?: Record<string, any>;
    initialSort?: ListParams['sort'];
}
