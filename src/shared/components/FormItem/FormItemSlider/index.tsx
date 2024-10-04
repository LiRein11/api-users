import React, {FC} from 'react';
import {Col, Form, Row, Slider} from "antd";
import {FormItemProps} from "../../../model/types/FormItemProps";

interface StatusesSlider {
    id: number,
    label: string,
    interval: {
        min?: number,
        max?: number,
    }
}

interface FormItemSliderProps extends FormItemProps {
    step?: number,
    min?: number,
    max: number,
    labelRender?: (current: number) => string,
    statuses?: StatusesSlider[],
}

const FormItemSlider: FC<FormItemSliderProps> = (props) => {
    const sliderStatus = (value: number) => {

        let status = props.statuses?.find(status => {
            if (status.interval.min !== undefined && status.interval.max !== undefined) {
                return value > status.interval.min && value <= status.interval.max
            } else if (status.interval.min !== undefined) {
                return value > status.interval.min
            } else if (status.interval.max !== undefined) {
                return value <= status.interval.max
            }
            return false;
        })
        return status?.label;
    }


    return (
        <div style={{padding: '0 16px'}}>
            {
                props.label
                    ? <h4 className={'form_label'}>{props.label}</h4>
                    : null
            }
            <Row gutter={[16, 0]} wrap={false}>
                <Col flex={'auto'}>
                    <Form.Item
                        id={props.formName}
                        name={props.name}
                        rules={props.required ? [{required: true}] : []}
                    >
                        <Slider
                            min={props.min}
                            max={props.max}
                            marks={
                                Array.from({length: (props.max / (props.step ?? 1)) + 1}, (_, i) => (i)).reduce((acc, currentValue) => ({
                                    ...acc,
                                    [currentValue * (props.step ?? 1)]: props.labelRender
                                        ? props.labelRender(currentValue * (props.step ?? 1))
                                        : `${currentValue * (props.step ?? 1)}`
                                }), {})
                            }/>
                    </Form.Item>
                </Col>
                {
                    props.extra
                        ? <Col>{props.extra}</Col>
                        : null
                }
            </Row>
        </div>
    );
};

export default FormItemSlider;