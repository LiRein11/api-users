import { FC, useEffect } from 'react';

import './styles.css';
import UsersTableItem from './components/UsersTableItem/UsersTableItem';
import useUsersStore from '../../../../api/store';

interface UsersTableItemListProps {}

const UsersTableItemList: FC<UsersTableItemListProps> = (props) => {
    const { users, loading } = useUsersStore();

    return (
        <>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    users.map((item) => <UsersTableItem user={item} key={item.id} />)
                )}
            </div>
        </>
    );
};

export default UsersTableItemList;
