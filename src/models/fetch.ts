export enum Status {
    Initializing = 'initializing',
    Loading = 'loading',
    Success = 'success',
    Error = 'error'
}

export interface UseFetchResult<T> {
    data: T | null;
    error: unknown;
    status: Status;
    load: () => void;
    setData: (data: T | null) => void;
}
