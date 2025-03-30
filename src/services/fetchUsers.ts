import { User } from '../models/User';
import { sortUsers } from '../utils/sortUsers';

type SortParams = { field: string; direction: 'asc' | 'desc' };

export const fetchUsers = async (params: {
    page: number;
    pageSize: number;
    filters?: { search?: string };
    sort?: SortParams;
}) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); //example
    let users: User[] = await response.json();

    // filters
    if (params.filters?.search) {
        users = users.filter((u) =>
            u.name.toLowerCase().includes(params.filters!.search.toLowerCase())
        );
    }

    // sorting
    users = sortUsers(users, params.sort);

    // paginated
    const start = (params.page - 1) * params.pageSize;
    const paginated = users.slice(start, start + params.pageSize);

    return {
        items: paginated,
        total: users.length,
    };
};
