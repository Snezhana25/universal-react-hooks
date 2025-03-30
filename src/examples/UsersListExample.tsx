import { useList } from '../hooks/useList';
import { User } from '../models/user';
import { Status } from '../models/fetch';
import { fetchUsers } from '../services/fetchUsers';
import styles from '../styles/usersList.module.css';
import { useState } from 'react';
import { Dropdown } from '../shared/components/Dropdown';

const pageSizeOptions = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: 'All', value: 1000 },
];

export const UsersListExample = () => {
    const [selectedPageSize, setSelectedPageSize] = useState<number>(3);

    const {
        data: users,
        page,
        setPage,
        pageCount,
        status,
        error,
        refetch,
        setFilters,
        setSort,
    } = useList<User>({
        fetchData: fetchUsers,
        initialPage: 1,
        pageSize: selectedPageSize,
    });

    const handlePageSizeChange = (value: number) => {
        setPage(1);
        setSelectedPageSize(value);
    };

    return (
        <div className={styles.container}>
            <h2>Users (page {page})</h2>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search name..."
                    onChange={(e) => setFilters({ search: e.target.value })}
                    className={styles.input}
                />
                <button onClick={() => setSort({ field: 'name', direction: 'asc' })} className={styles.button}>Sort A–Z</button>
                <button onClick={() => setSort({ field: 'name', direction: 'desc' })} className={styles.button}>Sort Z–A</button>
                <Dropdown
                    options={pageSizeOptions}
                    value={selectedPageSize}
                    onChange={handlePageSizeChange}
                    placeholder="Page size"
                />
            </div>

            {status === Status.Loading && <p>Loading...</p>}
            {status === Status.Error && <p>Error: {String(error)}</p>}

            <ul className={styles.list}>
                {users.map((user) => (
                    <li key={user.id} className={styles.listItem}>
                        <strong>{user.name}</strong> — {user.email}
                    </li>
                ))}
            </ul>

            {selectedPageSize < 1000 && (
                <div className={styles.pagination}>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)} className={styles.button}>
                        Prev
                    </button>
                    <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className={styles.button}>
                        Next
                    </button>
                </div>
            )}

            <button onClick={refetch} className={styles.button}>
                Refresh
            </button>
        </div>
    );
};
