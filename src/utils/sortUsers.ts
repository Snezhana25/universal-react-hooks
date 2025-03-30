import { SortParams } from '../models/list';


export function sortUsers<T extends Record<string, any>>(
    users: T[],
    sort?: SortParams
): T[] {
    if (!sort) return users;
    const { field, direction } = sort;
    return users.sort((a, b) =>
        direction === 'asc'
            ? String(a[field]).localeCompare(String(b[field]))
            : String(b[field]).localeCompare(String(a[field]))
    );
}
