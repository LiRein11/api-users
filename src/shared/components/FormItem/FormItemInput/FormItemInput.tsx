import { Col, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import isNumeric from 'antd/es/_util/isNumeric';
import './style.css';
import { FormItemProps } from '../../../model/types/FormItemProps';

export enum InputTypeEnum {
    textArea,
    password,
}

export enum InputFormatEnum {
    number,
}

export interface FormItemInputProps extends FormItemProps {
    placeHolder?: string;
    type?: InputTypeEnum;
    rows?: number;
    maxLength?: number;
    minLength?: number;
    format?: InputFormatEnum;
    disable?: boolean;
}

const FormItemInput: FC<FormItemInputProps> = (props) => {
    const getInputType = () => {
        switch (props.type) {
            case InputTypeEnum.password:
                return <Input.Password disabled={props.disable} placeholder={props.placeHolder} />;
            case InputTypeEnum.textArea:
                return (
                    <Input.TextArea
                        onBlur={props.onBlur}
                        rows={props.rows}
                        maxLength={props.maxLength}
                        disabled={props.disable}
                        placeholder={props.placeHolder}
                        style={{ resize: !!props.rows ? 'none' : undefined }}
                    />
                );
            default:
                return (
                    <Input
                        onBlur={props.onBlur}
                        maxLength={props.maxLength}
                        minLength={props.minLength}
                        disabled={props.disable}
                        placeholder={props.placeHolder}
                    />
                );
        }
    };

    const rules = [];

    if (props.required) {
        rules.push({
            required: true,
            message: `${props.label} обязательно для заполнения`,
        });
    }

    if (props.minLength !== undefined) {
        rules.push({
            min: props.minLength,
            message: `${props.label} должно быть не короче ${props.minLength} символов`,
        });
    }

    if (props.maxLength !== undefined) {
        rules.push({
            max: props.maxLength,
            message: `${props.label} должно быть не длиннее ${props.maxLength} символов`,
        });
    }

    if (props.format === InputFormatEnum.number) {
        rules.push({
            validator: (rule: any, value: any) => {
                if (
                    ((isNumeric(value) ||
                        !(value && typeof value === 'string' && value.length > 0)) &&
                        !props.required) ||
                    (props.required && value && isNumeric(value))
                ) {
                    return Promise.resolve();
                } else {
                    return Promise.reject(new Error('Field Not a Number'));
                }
            },
        });
    }

    return (
        <div style={{ width: '100%' }}>
            <Row gutter={[16, 0]} wrap={false}>
                <Col flex={'auto'}>
                    <Form.Item
                        id={props.formName}
                        name={props.name}
                        label={
                            props.label && (
                                <div className={`form_label ${props.labelAlign ?? 'left'}`}>
                                    {props.label}
                                </div>
                            )
                        }
                        style={{
                            marginBottom: props.marginBottom ?? 16,
                            color: 'white !important',
                        }}
                        rules={rules}
                        required={false}
                    >
                        {getInputType()}
                    </Form.Item>
                </Col>
                {props.extra ? <Col>{props.extra}</Col> : null}
            </Row>
        </div>
    );
};

export default FormItemInput;
