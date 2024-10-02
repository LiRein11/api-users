import { FC, useEffect } from 'react';
import useUsersStore from './api/store';
import UsersTable from './components/UsersTable/UsersTable';
import UsersHeader from './components/UsersHeader/UsersHeader';
import UsersLayout from '../../widgets/Layouts/UsersLayout/UsersLayout';
import UsersSidebar from './components/UsersSidebar/UsersSidebar';

interface UsersProps {}

const Users: FC<UsersProps> = (props) => {
    const { users, loading, error, getUsersAll } = useUsersStore();

    useEffect(() => {
        getUsersAll({ active_only: true });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <UsersLayout
            sidebar={<UsersSidebar />}
            header={<UsersHeader />}
            body={<UsersTable users={users} />}
        />
    );
};

export default Users;
