import { FC, useEffect, useState } from 'react';
import useUsersStore from './api/store';
import UsersTable from './components/UsersTable/UsersTable';
import UsersHeader from './components/UsersHeader/UsersHeader';
import UsersLayout from '../../widgets/Layouts/UsersLayout/UsersLayout';
import UsersSidebar from './components/UsersSidebar/UsersSidebar';
import ModalWidget from '../../widgets/Layouts/ModalWidget/ModalWidget';
import CustomButton from '../../shared/components/Buttons/CustomButton/CustomButton';
import { Form } from 'antd';
import FormItemInput from '../../shared/components/FormItem/FormItemInput/FormItemInput';

import FormItemSwitch from '../../shared/components/FormItem/FormItemSwitch/FormItemSwitch';
import UsersCreateForm from './components/UsersCreateForm/UsersCreateForm';
import UsersEditForm from './components/UsersEditForm/UsersEditForm';

interface UsersProps {}

const Users: FC<UsersProps> = (props) => {
    const [form] = Form.useForm();
    const {
        createPerson,
        setOpenAdd,
        openAdd,
        error,
        getUsersAll,
        clearError,
        editable,
        updatePerson,
        setEditable,
    } = useUsersStore();

    const handleRetry = () => {
        clearError();
    };

    useEffect(() => {
        getUsersAll({ active_only: false });
    }, []);

    return (
        <>
            <ModalWidget
                title={'Добавить пользователя'}
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                width={616}
            >
                <UsersCreateForm />
            </ModalWidget>

            <ModalWidget
                title={'Редактировать пользователя'}
                open={!!editable}
                width={616}
                onClose={() => setEditable(undefined)}
            >
                <UsersEditForm initState={editable} />
            </ModalWidget>

            <UsersLayout
                sidebar={<UsersSidebar />}
                header={<UsersHeader />}
                body={<UsersTable />}
            />
        </>
    );
};

export default Users;
