import React, { FC } from 'react';
import { Col, Form, Row, Switch } from 'antd';
import { FormItemProps } from 'shared/model/types/FormItemProps';

interface FormItemSwitchProps extends FormItemProps {}

const FormItemSwitch: FC<FormItemSwitchProps> = (props) => {
    return (
        <Row wrap={false}>
            {/*{props.label ? (*/}
            {/*    <Col flex={'auto'}>*/}
            {/*        <div className={'form_label'}>{props.label}</div>*/}
            {/*    </Col>*/}
            {/*) : null}*/}
            <Col>
                <Form.Item
                    label={
                        props.label && (
                            <div className={`form_label ${props.labelAlign ?? 'left'}`}>
                                {props.label}
                            </div>
                        )
                    }
                    id={props.formName}
                    name={props.name}
                    rules={props.required ? [{ required: true }] : []}
                    style={{ marginBottom: props.marginBottom ?? 16 }}
                    required={false}
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormItemSwitch;
