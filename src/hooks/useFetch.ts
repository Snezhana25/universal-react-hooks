import { Status, UseFetchResult } from "../models/fetch";
import { useCallback, useEffect, useRef, useState } from "react";

/*
    * @param getData - a function that returns a Promise with data
    * @param watch - an array of dependencies, when changed, the hook automatically updates the data
    * @param options - hook options (e.g. debounceMs to delay the call)
*/

export function useFetch<T>(
    getData: (options?: { signal?: AbortSignal }) => Promise<T>,
    watch: unknown[] = [],
    options: { debounceMs?: number } = {}
): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [status, setStatus] = useState<Status>(Status.Initializing);

    // Request sequence number to prevent race condition
    const currentIndexRef = useRef<number>(0);

    const fetchAbortControllerRef = useRef<AbortController | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    // Initiates a request to retrieve and update data
    const load = useCallback(() => {
        if (options?.debounceMs) {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                execute();
            }, options.debounceMs);
        } else {
            execute();
        }

        function execute() {
            // Cancels the previous request to avoid a race condition
            // (for example, when a new request is started before the previous one is completed)
            fetchAbortControllerRef.current?.abort();
            const controller = new AbortController();
            fetchAbortControllerRef.current = controller;

            setStatus(Status.Loading);
            setError(null);
            const currentRequestId = ++currentIndexRef.current;

            getData({ signal: controller.signal })
                .then((res) => {
                    if (currentRequestId === currentIndexRef.current) {
                        setData(res);
                        setStatus(Status.Success);
                    }
                })
                .catch((err) => {
                    if (currentRequestId === currentIndexRef.current) {
                        if ((err as Error).name !== 'AbortError') {
                            setError(err);
                            setStatus(Status.Error);
                        }
                    }
                });
        }
    }, [getData, options]);

    useEffect(() => {
        load();
        return () => {
            fetchAbortControllerRef.current?.abort();
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, watch);

    return {
        data,
        error,
        status,
        load,
        setData,
    };
}
