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

interface UsersCreateFormProps {
    onSave?: (values: any) => void; // Добавляем функцию для передачи данных обратно
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
                onSave!({ ...values, job_title_id: values.job_title_id ? 1 : 2 });
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

// import { FC } from 'react';
//
// import './styles.css';
// import { Form } from 'antd';
// import FormItemInput, {
//     InputFormatEnum,
//     InputTypeEnum,
// } from '../../../../shared/components/FormItem/FormItemInput/FormItemInput';
// import FormItemSwitch from '../../../../shared/components/FormItem/FormItemSwitch/FormItemSwitch';
// import CustomButton from '../../../../shared/components/Buttons/CustomButton/CustomButton';
// import useUsersStore from '../../api/store';
//
// interface UsersCreateFormProps {}
//
// const UsersCreateForm: FC<UsersCreateFormProps> = (props) => {
//     const {} = props;
//     const [form] = Form.useForm();
//     const formName = 'users-create-form';
//     const { createPerson, error, loading, clearError } = useUsersStore();
//
//     const onSave = () => {
//         form.validateFields()
//             .then((values) => {
//                 console.log(values);
//                 createPerson({ ...values, job_title_id: values.job_title_id ? 1 : 2 });
//                 // if (!error) {
//                 //     form.resetFields();
//                 // }
//             })
//             .catch(() => {});
//     };
//
//     return (
//         <Form id={formName} form={form}>
//             <FormItemInput
//                 formName={formName}
//                 form={form}
//                 name="fio"
//                 label="Фио"
//                 placeHolder={'FIO'}
//                 required
//             />
//             <FormItemInput
//                 formName={formName}
//                 form={form}
//                 name="code"
//                 label="Пароль"
//                 placeHolder={'Password'}
//                 type={InputTypeEnum.password}
//                 required
//             />
//             <FormItemSwitch
//                 formName={formName}
//                 form={form}
//                 name="job_title_id"
//                 label={'Администратор'}
//             />
//             <FormItemInput
//                 formName={formName}
//                 form={form}
//                 name="iin"
//                 label="ИИН"
//                 placeHolder={'IIN'}
//                 required
//                 minLength={12}
//                 maxLength={12}
//                 format={InputFormatEnum.number}
//             />
//             <Form.Item>
//                 {error ? (
//                     <>
//                         <div>Error{error}</div>
//                         <CustomButton
//                             loading={loading}
//                             className={'modal_btn'}
//                             text={'Ещё раз'}
//                             onClick={clearError}
//                         />
//                     </>
//                 ) : (
//                     <CustomButton
//                         loading={loading}
//                         className={'modal_btn'}
//                         text={'Сохранить'}
//                         onClick={onSave}
//                     />
//                 )}
//             </Form.Item>
//         </Form>
//     );
// };
//
// export default UsersCreateForm;
