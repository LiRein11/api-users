import React, {FC} from 'react';
import {Col, DatePicker, Form, Row} from "antd";
import {FormItemProps} from "../../../model/types/FormItemProps";

export interface FormItemDatepickerProps extends FormItemProps {
    onlyYear?: boolean;
    showTime?: boolean,
    range?: boolean,
    placeholder?: string,
}

const FormItemDatepicker: FC<FormItemDatepickerProps> = (props) => {
    return (
        <Row gutter={[16, 0]} wrap={false}>
            <Col flex={'auto'}>
                <Form.Item
                    id={props.formName}
                    name={props.name}
                    label={props.label
                        ? <h4 className={'form_label'}>{props.label}</h4>
                        : null
                    }
                    rules={props.required ? [{required: true}] : []}

                >
                    {
                        props.range
                            ? <DatePicker.RangePicker
                                showTime={props.showTime}
                            />
                            : <DatePicker
                                placeholder={props.placeholder}
                                picker={props.onlyYear ? 'year' : undefined}
                                style={{width: '100%'}}
                                showTime={props.showTime}
                            />
                    }
                </Form.Item>
            </Col>
            {
                props.extra
                    ? <Col>{props.extra}</Col>
                    : null
            }
        </Row>
    );
};

export default FormItemDatepicker;