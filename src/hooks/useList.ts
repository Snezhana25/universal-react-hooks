import { useMemo, useState } from 'react';
import { useFetch } from './useFetch';
import {
    ListParams,
    PaginatedResponse,
    UseListOptions
 } from '../models/list';

export function useList<T>({fetchData, initialPage = 1, pageSize = 10, initialFilters = {}, initialSort,}: UseListOptions<T>) {
    const [page, setPage] = useState(initialPage);
    const [filters, setFilters] = useState<Record<string, unknown>>(initialFilters);
    const [sort, setSort] = useState<ListParams['sort']>(initialSort);

    const fetchParams = useMemo(() => ({
        page,
        pageSize,
        filters,
        sort,
    }), [page, pageSize, filters, sort]);

    const {
        data,
        error,
        status,
        load,
        setData,
    } = useFetch<PaginatedResponse<T>>(
        () => fetchData(fetchParams),
        [fetchParams]
    );

    const pageCount = useMemo(() => {
        if (!data || data.total === 0) return 1;
        return Math.ceil(data.total / pageSize);
    }, [data, pageSize]);

    return {
        data: data?.items || [],
        total: data?.total || 0,
        error,
        status,
        page,
        setPage,
        filters,
        setFilters,
        sort,
        setSort,
        pageSize,
        pageCount,
        refetch: load,
        setData,
    };
}
