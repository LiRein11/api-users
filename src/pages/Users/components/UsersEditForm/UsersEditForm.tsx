import { FC, useEffect, useState } from 'react';

import './styles.css';
import { Col, Form, Row } from 'antd';

import FormItemSwitch from '../../../../shared/components/FormItem/FormItemSwitch/FormItemSwitch';
import CustomButton from '../../../../shared/components/Buttons/CustomButton/CustomButton';
import useUsersStore from '../../api/store';
import IUser from '../../../../app/api/entites/User/IUser';
import FormItemInput, {
    InputFormatEnum,
    InputTypeEnum,
} from '../../../../shared/components/FormItem/FormItemInput/FormItemInput';
import FormItemSelect, {
    ISelectOption,
} from '../../../../shared/components/FormItem/FormItemSelect/FormItemSelect';

interface UsersEditFormProps {
    initState?: IUser;
}

const UsersEditForm: FC<UsersEditFormProps> = (props) => {
    const { initState } = props;
    const [form] = Form.useForm();
    const formName = 'users-edit-form';
    const { updatePerson, loading, updatePersonFired, editable, users } = useUsersStore();

    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

    const onSave = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                updatePerson({
                    ...values,
                    job_title_id: values.job_title_id ? 1 : 2,
                });
            })
            .catch(() => {});
    };
    console.log(initState);

    const onSaveFired = (fire: boolean) => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                updatePersonFired({
                    ...values,
                    is_fired: fire,
                    job_title_id: values.job_title_id ? 1 : editable?.job_title.id,
                });
                form.setFieldsValue({
                    ...values,
                    is_fired: fire,
                });
            })
            .catch(() => {});
    };

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.fio,
        // label: (
        //     <Row gutter={[8, 0]} wrap={false} justify={'center'}>
        //         <Col>
        //             <div>
        //                 <h3>Описание пользователя:</h3>
        //                 <p>ID: {user.id}</p>
        //                 <p>FIO: {user.fio}</p>
        //                 <p>Code: {user.code}</p>
        //                 <p>Is Fired: {user.is_fired ? 'Yes' : 'No'}</p>
        //                 <p>IIN: {user.iin}</p>
        //                 <p>Job Title: {user.job_title.name}</p>
        //             </div>
        //         </Col>
        //     </Row>
        // ),
    }));

    const handleUserSelect = (user: any) => {
        const item = users.find((item) => item.id === user);

        setSelectedUser(item);
    };

    const handleAddUser = () => {
        if (selectedUser) {
            setSelectedUser(undefined);
        }
    };

    const handleCancel = () => {
        setSelectedUser(undefined);
    };

    return (
        <Form
            id={formName}
            form={form}
            initialValues={{
                ...initState,
                job_title_id: initState?.job_title.id == 1,
            }}
        >
            <FormItemInput
                formName={formName}
                form={form}
                name="fio"
                label="Фио"
                placeHolder={'FIO'}
                required
            />
            <FormItemInput
                formName={formName}
                form={form}
                name="code"
                label="Пароль"
                placeHolder={'Password'}
                type={InputTypeEnum.password}
                required
            />
            <FormItemSwitch
                formName={formName}
                form={form}
                name="job_title_id"
                label={'Администратор'}
            />
            <FormItemInput
                formName={formName}
                form={form}
                name="iin"
                label="ИИН"
                placeHolder={'IIN'}
                required
                maxLength={12}
                format={InputFormatEnum.number}
            />

            <FormItemInput
                name="id"
                formName={formName}
                form={form}
                disable
                label="ID"
                placeHolder={'ID'}
            />
            <FormItemSwitch
                formName={formName}
                form={form}
                disable
                name="is_fired"
                label="Уволен"
            />
            <FormItemSelect
                items={userOptions}
                name="users"
                form={form}
                formName={formName}
                showButtonsAndDescription
                callBack={handleUserSelect}
                onAdd={handleAddUser}
                onCancel={handleCancel}
            />

            {selectedUser && (
                <Row gutter={[8, 0]} wrap={false} justify={'center'}>
                    <Col>
                        <div>
                            <h3>Описание пользователя:</h3>
                            <p>ID: {selectedUser.id}</p>
                            <p>FIO: {selectedUser.fio}</p>
                            <p>Code: {selectedUser.code}</p>
                            <p>Is Fired: {selectedUser.is_fired ? 'Yes' : 'No'}</p>
                            <p>IIN: {selectedUser.iin}</p>
                            <p>Job Title: {selectedUser.job_title.name}</p>
                        </div>
                    </Col>
                </Row>
            )}

            <Row gutter={[8, 0]} wrap={false} justify={'center'}>
                <Col>
                    <Form.Item>
                        <CustomButton
                            loading={loading}
                            className={'modal_btn'}
                            text={'Обновить'}
                            onClick={onSave}
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Row gutter={[2, 0]} wrap={false}>
                        <Col>
                            <Form.Item>
                                <CustomButton
                                    loading={loading}
                                    className={'modal_btn_fired_no'}
                                    color="primary"
                                    variant="outlined"
                                    text={'Восстановить'}
                                    onClick={() => onSaveFired(false)}
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <CustomButton
                                    loading={loading}
                                    className={'modal_btn_fired_yes'}
                                    text={'Уволить'}
                                    color="danger"
                                    variant="outlined"
                                    onClick={() => onSaveFired(true)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default UsersEditForm;
