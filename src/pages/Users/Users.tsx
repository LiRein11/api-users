import { FC, useEffect, useState } from 'react';
import useUsersStore from './api/store';
import UsersTable from './components/UsersTable/UsersTable';
import UsersHeader from './components/UsersHeader/UsersHeader';
import UsersLayout from '../../widgets/Layouts/UsersLayout/UsersLayout';
import UsersSidebar from './components/UsersSidebar/UsersSidebar';
import ModalWidget from '../../widgets/Layouts/ModalWidget/ModalWidget';
import CustomButton from '../../shared/components/Buttons/CustomButton/CustomButton';
import { Form } from 'antd';
import FormItemInput from '../../shared/components/Buttons/FormItemInput/FormItemInput';

import { validateIIN } from '../../shared/helpers/validateForm';

interface UsersProps {}

const initialState = {
    fio: '',
    password: '',
    job_title_id: 1,
    iin: '',
};

const Users: FC<UsersProps> = (props) => {
    const [form] = Form.useForm();
    const {
        createPerson,
        setOpenAdd,
        openAdd,
        error,
        getUsersAll,
        clearError,
        isAdmin,
        setIsAdmin,
        success,
    } = useUsersStore();

    const onFinish = (values: any) => {
        const iinError = validateIIN(values.iin);
        if (iinError) {
            form.setFields([{ name: 'iin', errors: [iinError] }]);
            return;
        }
        console.log(values);
        createPerson({
            ...values,
            job_title_id: isAdmin ? 1 : 2,
        });
    };

    const handleIsAdminChange = (checked: boolean) => {
        setIsAdmin(checked);
        form.setFieldsValue({ job_title_id: checked });
    };

    const handleRetry = () => {
        clearError();
    };

    useEffect(() => {
        getUsersAll({ active_only: true });
    }, []);

    useEffect(() => {
        if (success) {
            form.resetFields();
        }
    }, [success, form]);

    return (
        <>
            {openAdd && (
                <ModalWidget header={'Добавить пользователя'} onClose={setOpenAdd}>
                    {error ? (
                        <>
                            <div>Error: {error}</div>
                            <Form form={form} onFinish={onFinish}>
                                <Form.Item>
                                    <CustomButton
                                        className={'modal_btn'}
                                        text={'Ещё раз'}
                                        onClick={handleRetry}
                                    />
                                </Form.Item>
                            </Form>
                        </>
                    ) : (
                        <Form form={form} initialValues={initialState} onFinish={onFinish}>
                            <FormItemInput
                                name="fio"
                                label="Фио"
                                inputProps={{ placeholder: 'FIO' }}
                                rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
                            />
                            <FormItemInput
                                name="code"
                                label="Пароль"
                                inputProps={{ placeholder: 'Password' }}
                                type={'password'}
                            />
                            <FormItemInput
                                name="job_title_id"
                                label={'Администратор'}
                                checkbox={true}
                                checkboxChecked={isAdmin}
                                onChange={handleIsAdminChange}
                            />
                            <FormItemInput
                                name="iin"
                                label="ИИН"
                                inputProps={{ placeholder: 'IIN' }}
                                rules={[{ required: true, message: 'Пожалуйста, введите ИИН' }]}
                            />
                            <Form.Item>
                                <CustomButton
                                    className={'modal_btn'}
                                    text={'Сохранить'}
                                    htmlType="submit"
                                />
                            </Form.Item>
                        </Form>
                    )}
                </ModalWidget>
            )}
            <UsersLayout
                sidebar={<UsersSidebar />}
                header={<UsersHeader openModal={setOpenAdd} />}
                body={<UsersTable />}
            />
        </>
    );
};

export default Users;
