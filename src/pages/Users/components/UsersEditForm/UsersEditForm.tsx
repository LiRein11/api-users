import { FC, useEffect } from 'react';

import './styles.css';
import { Form } from 'antd';

import FormItemSwitch from '../../../../shared/components/FormItem/FormItemSwitch/FormItemSwitch';
import CustomButton from '../../../../shared/components/Buttons/CustomButton/CustomButton';
import useUsersStore from '../../api/store';
import IUser from '../../../../app/api/entites/User/IUser';
import FormItemInput, {
    InputFormatEnum,
    InputTypeEnum,
} from '../../../../shared/components/FormItem/FormItemInput/FormItemInput';

interface UsersEditFormProps {
    initState?: IUser;
}

const UsersEditForm: FC<UsersEditFormProps> = (props) => {
    const { initState } = props;
    const [form] = Form.useForm();
    const formName = 'users-edit-form';
    const { updatePerson, error, loading } = useUsersStore();

    const onSave = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                updatePerson({
                    ...values,
                    id: initState?.id,
                    job_title_id: values.job_title_id ? 1 : 2,
                });
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (initState) {
            form.setFieldsValue(initState);
        } else {
            form.resetFields();
        }
    }, [initState, form]);

    return (
        <Form id={formName} form={form} initialValues={{ ...initState }}>
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
            <FormItemSwitch formName={formName} form={form} name="is_fired" label="Уволен" />

            <Form.Item>
                <CustomButton
                    loading={loading}
                    className={'modal_btn'}
                    text={'Обновить'}
                    onClick={onSave}
                />
            </Form.Item>
        </Form>
    );
};

export default UsersEditForm;
