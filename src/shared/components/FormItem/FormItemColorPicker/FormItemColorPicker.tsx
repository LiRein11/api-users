import React, {FC} from 'react';
import {Col, ColorPicker, Form, Row} from "antd";
import {ColorFormat} from "antd/es/color-picker/interface";
import { FormItemProps } from 'shared/model/types/FormItemProps';

interface FormItemColorPickerProps extends FormItemProps {

}

const FormItemColorPicker: FC<FormItemColorPickerProps> = (props) => {
    return (
        <Row wrap={false} style={{width: '100%'}}>
            {
                props.label && (
                    <Col flex={'168px'}>
                        <div
                            className={'form_label one_line'}
                            style={{paddingTop: 12}}
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
                    getValueFromEvent={(color) => color.toHexString()}
                >
                    <ColorPicker defaultValue={'#FFFFFF'} allowClear size="large" showText format={ColorFormat.hex}
                                 disabledAlpha/>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormItemColorPicker;