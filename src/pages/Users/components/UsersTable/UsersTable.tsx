import { FC } from 'react';

import TableLayout from '../../../../widgets/Layouts/TableLayout/TableLayout';
import UsersTableHeader from './components/UsersTableHeader/UsersTableHeader';
import UsersTableItemList from './components/UsersTableItemList/UsersTableItemList';
import IUser from '../../../../app/api/entites/User/IUser';

interface UsersTableProps {
    users: IUser[];
}

const UsersTable: FC<UsersTableProps> = (props) => {
    const { users } = props;

    return (
        <TableLayout body={<UsersTableItemList users={users} />} header={<UsersTableHeader />} />
    );
};

export default UsersTable;
