import { FC } from 'react';
import AvatarImg from 'app/assets/icons/Avatar.png';

import './styles.css';
import IUser from '../../../../../../app/api/entites/User/IUser';
import UsersTableItem from '../UsersTableItem/UsersTableItem';

export type DesignVariant = 'admin' | 'operator';

interface UsersTableItemListProps {
    users: IUser[];
}

const UsersTableItemList: FC<UsersTableItemListProps> = (props) => {
    const { users } = props;

    return (
        <div>
            {users.map((item) => (
                <UsersTableItem user={item} key={item.id} />
            ))}
        </div>
    );
};

export default UsersTableItemList;
