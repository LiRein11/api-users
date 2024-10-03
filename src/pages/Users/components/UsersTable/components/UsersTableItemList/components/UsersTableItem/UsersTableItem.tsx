import { FC } from 'react';
import AvatarImg from 'app/assets/icons/Avatar.png';

import './styles.css';
import IUser from '../../../../../../../../app/api/entites/User/IUser';

export type DesignVariant = 1 | 2;

interface UsersTableItemProps {
    user: IUser;
}

const variantClassMap: Record<number, string> = {
    1: 'table_item_role_admin',
    2: 'table_item_role_operator',
};

const UsersTableItem: FC<UsersTableItemProps> = (props) => {
    const { user } = props;

    const roleClass = variantClassMap[user.job_title.id];

    return (
        <div className="table_item">
            <div className="checkbox_column">
                <input style={{ width: 16, height: 16 }} type="checkbox" />
            </div>
            <div className="table_item_user">
                <img className="table_item_user_avatar" src={AvatarImg} alt="" />
                <div>Пользователь</div>
            </div>
            <div>{user.fio}</div>
            <div>{user.iin}</div>
            <div className={roleClass ?? 'table_item_role_operator'}>{user.job_title.name_add}</div>
        </div>
    );
};

export default UsersTableItem;
