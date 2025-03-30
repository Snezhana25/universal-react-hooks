import { useFetch } from '../hooks/useFetch';
import { Status } from '../models/fetch';
import { useState } from "react";
import { User } from "../models/user";
import { UserList } from "../components/UserList";

export const UsersExample = () => {
    const {
        data,
        status,
        load,
    } = useFetch<User[]>(() =>
            fetch('https://jsonplaceholder.typicode.com/users')
                .then((res) => res.json()),
        []
    );
    const [reloadCount, setReloadCount] = useState(0);

    const handleReload = () => {
        load();
        setReloadCount(c => c + 1);
    };

    return (
        <div style={{ padding: '1rem', maxWidth: '600px' }}>
            <h2>useFetch Demo</h2>

            <button onClick={handleReload}>
                Reload
            </button>
            <p>Reloaded: {reloadCount} times</p>

            <p>Status: <strong>{status}</strong></p>
            <p>Total users: {Array.isArray(data) ? data.length : 0}</p>
            {status === Status.Loading && <p>Loading...</p>}
            {status === Status.Error && <p style={{ color: 'red' }}>Error occurred</p>}
            {status === Status.Success && data && (
                <UserList users={data} />
            )}
        </div>
    );
};
