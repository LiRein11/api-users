import { FC } from 'react';

import './styles.css';
import { Form } from 'antd';
import FormItemInput, {
    InputFormatEnum,
    InputTypeEnum,
} from '../../../../shared/components/FormItem/FormItemInput/FormItemInput';
import FormItemSwitch from '../../../../shared/components/FormItem/FormItemSwitch/FormItemSwitch';
import CustomButton from '../../../../shared/components/Buttons/CustomButton/CustomButton';
import useUsersStore from '../../api/store';
import IUser from '../../../../app/api/entites/User/IUser';

interface UsersCreateFormProps {
    onSave?: (user: IUser) => void;
}

const UsersCreateForm: FC<UsersCreateFormProps> = (props) => {
    const { onSave } = props;
    const [form] = Form.useForm();
    const formName = 'users-create-form';
    const { createPerson, error, loading, clearError } = useUsersStore();

    const onSaveHandler = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                createPerson({ ...values, job_title_id: values.job_title_id ? 1 : 2 });
                onSave?.({ ...values, job_title_id: values.job_title_id ? 1 : 2 });
            })
            .catch(() => {});
    };

    return (
        <Form id={formName} form={form}>
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
                minLength={12}
                maxLength={12}
                format={InputFormatEnum.number}
            />
            <Form.Item>
                {error ? (
                    <>
                        <div>Error{error}</div>
                        <CustomButton
                            loading={loading}
                            className={'modal_btn'}
                            text={'Ещё раз'}
                            onClick={clearError}
                        />
                    </>
                ) : (
                    <CustomButton
                        loading={loading}
                        className={'modal_btn'}
                        text={'Сохранить'}
                        onClick={onSaveHandler}
                    />
                )}
            </Form.Item>
        </Form>
    );
};

export default UsersCreateForm;
