import React, {FC, ReactNode} from 'react';
import {Col, Form, Row, Select, Space} from "antd";
import {FormItemProps} from "../../../model/types/FormItemProps";


export interface ISelectOption {
    value: any,
    label: ReactNode,
}

export interface FormItemSelectProps extends FormItemProps {
    callBack?: (value: any) => void,
    placeholder?: string,
    items: ISelectOption[],
    multiply?: boolean,
    showCode?: boolean,
    allowClear?: boolean,
    oneLine?: boolean,
}

const FormItemSelect: FC<FormItemSelectProps> = (props) => {

    return (
        <div style={{width: '100%'}}>
            <Row gutter={[16, 0]} wrap={false}>
                <Col flex={'auto'}>
                    <Form.Item
                        id={props.formName}
                        name={props.name}
                        rules={props.required ? [{required: true}] : []}
                        // labelCol={props.labelAlign === 'left' ? undefined : {span: 'auto'}}
                        // labelAlign={props.labelAlign ?? 'left'}
                        label={props.label ? <div className={'form_label'}>
                            {props.label}
                        </div> : null}
                        style={{marginBottom: props.marginBottom ?? 16}}
                        required={false}
                    >
                        <Select
                            size={'large'}
                            className={`select_widget ${props.disable && 'disable'}`}
                            disabled={props.disable}
                            allowClear={props.allowClear}
                            onFocus={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--button-secondary-hover)'
                                props.onFocus?.()
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                props.onBlur?.()
                            }}
                            maxTagCount={props.oneLine ? "responsive" : undefined}
                            mode={props.multiply ? "multiple" : undefined}
                            showSearch
                            style={{
                                width: '100%',
                                borderRadius: 'var(--basic-border-radius)',
                            }}
                            placeholder={props.placeholder}
                            filterOption={(input, option) => {
                                if (typeof option?.label === 'string') {
                                    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                return false
                            }}
                            options={props.items.sort((a, b) => (a.value - b.value))}
                            optionRender={(option) => (
                                <Space>
                                    {option.label}
                                </Space>
                            )}
                            onChange={(value) => props.callBack?.(props.items.find(item => item.value === value))}
                        />
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

export default FormItemSelect;