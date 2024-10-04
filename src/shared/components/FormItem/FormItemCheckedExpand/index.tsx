import React, {FC, ReactNode} from 'react';
import {Checkbox, Form} from "antd";
import {FormItemProps} from "../../../model/types/FormItemProps";

interface FormItemCheckedExpandProps extends FormItemProps {
    children?: ReactNode
}

const FormItemCheckedExpand: FC<FormItemCheckedExpandProps> = (props) => {

    return (
        <div>
            <Form.Item
                id={props.formName}
                name={props.name}
                valuePropName="checked"
                style={{marginBottom: 0}}
            >
                <Checkbox>
                    <h4>{props.label}</h4>
                </Checkbox>
            </Form.Item>
            <Form.Item noStyle shouldUpdate={(prevValues, curValues) => {
                return prevValues[props.name] !== curValues[props.name];
            }}>
                {({getFieldValue,}) => {
                    return <div style={{display: getFieldValue(props.name) ? undefined : 'none'}}>{props.children}</div>
                }}
            </Form.Item>
        </div>

    );
};

export default FormItemCheckedExpand;