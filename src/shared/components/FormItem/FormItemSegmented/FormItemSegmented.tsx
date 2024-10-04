import React, {FC, ReactNode} from 'react';
import {Col, Form, Row, Segmented} from "antd";
import {FormItemProps} from "../../../model/types/FormItemProps";

interface ISelectOption {
    value: any,
    label: ReactNode,
}

interface FormItemSegmentedProps extends FormItemProps {
    block?: boolean,
    items: ISelectOption[]
}

const FormItemSegmented: FC<FormItemSegmentedProps> = (props) => {
    return (
        <Row wrap={false} style={{width: '100%'}}>
            {
                props.label && (
                    <Col flex={'168px'}>
                        <div
                            className={'form_label one_line'}
                            style={{paddingTop: 6}}
                        >{props.label} :
                        </div>
                    </Col>
                )
            }
            <Col flex={'auto'}>
                <Form.Item
                    id={props.formName}
                    name={props.name}
                    style={{
                        width: '100%',
                        marginBottom: props.marginBottom
                    }}
                >
                    <Segmented options={props.items} block={props.block}/>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormItemSegmented;