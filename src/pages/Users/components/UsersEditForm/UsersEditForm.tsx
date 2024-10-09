import React, { FC } from 'react';

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

import UsersSelector from '../UsersSelector/UsersSelector';

interface UsersEditFormProps {
    initState?: IUser;
}

const UsersEditForm: FC<UsersEditFormProps> = (props) => {
    const { initState } = props;
    const [form] = Form.useForm();
    const formName = 'users-edit-form';
    const { updatePerson, loading, updatePersonFired, editable, users } = useUsersStore();

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

    return (
        <>
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
                <UsersSelector formName={formName} form={form} name="users" multiply />

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
        </>
    );
};

export default UsersEditForm;
