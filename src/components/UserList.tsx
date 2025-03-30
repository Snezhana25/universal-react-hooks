import {UserListProps} from "../models/user";

export const UserList = ({ users }: UserListProps) => {
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <strong>{user.name}</strong><br />
                    <small>{user.email} — {user.address.city}</small>
                </li>
            ))}
        </ul>
    );
};
