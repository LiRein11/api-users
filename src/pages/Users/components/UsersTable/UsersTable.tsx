import { FC } from 'react';

import TableLayout from '../../../../widgets/Layouts/TableLayout/TableLayout';
import UsersTableHeader from './components/UsersTableHeader/UsersTableHeader';
import UsersTableItemList from './components/UsersTableItemList/UsersTableItemList';

interface UsersTableProps {}

const UsersTable: FC<UsersTableProps> = (props) => {
    return <TableLayout body={<UsersTableItemList />} header={<UsersTableHeader />} />;
};

export default UsersTable;
