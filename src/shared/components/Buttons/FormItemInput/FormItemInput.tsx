import { FC } from 'react';
import { Form, FormItemProps, Input, InputProps, Switch } from 'antd';
import './styles.css';

interface FormItemInputProps extends FormItemProps {
    name: string;
    label: string;
    type?: 'text' | 'password';
    checkbox?: boolean;
    checkboxChecked?: boolean;
    inputProps?: InputProps;
    rules?: any[];
    onChange?: (checked: boolean) => void;
}

const FormItemInput: FC<FormItemInputProps> = (props) => {
    const { name, label, rules, checkbox, type, checkboxChecked, inputProps, onChange } = props;

    return (
        <Form.Item name={name} label={label} rules={rules}>
            {checkbox ? (
                <Switch checked={checkboxChecked ?? false} onChange={onChange} />
            ) : type === 'password' ? (
                <Input.Password {...inputProps} />
            ) : (
                <Input {...inputProps} />
            )}
        </Form.Item>
    );
};

export default FormItemInput;
