import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Col, Form, Row, Select, Space } from 'antd';
import { FormItemProps } from '../../../model/types/FormItemProps';
import CustomButton from '../../Buttons/CustomButton/CustomButton';
import OkayImg from 'app/assets/icons/Okay.png';
import CloseImg from 'app/assets/icons/Close.png';

export interface ISelectOption {
    value: any;
    label: ReactNode;
}

export interface FormItemSelectProps extends FormItemProps {
    callBack?: (value: any) => void;
    placeholder?: string;
    items: ISelectOption[];
    multiply?: boolean;
    showCode?: boolean;
    allowClear?: boolean;
    oneLine?: boolean;
    showButtonsAndDescription?: boolean;
    onAdd?: () => void;
    onCancel?: () => void;
}

const FormItemSelect: FC<FormItemSelectProps> = (props) => {
    const [selectedItem, setSelectedItem] = useState<ISelectOption | null>(null);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setShowButtons(true);
        } else {
            setShowButtons(false);
        }
    }, [selectedItem]);

    const handleItemSelect = (value: any) => {
        // const item = props.items.find((item) => item.value === value);
        setSelectedItem(value || null);
        props.callBack?.(value);
    };

    const handleAddItem = () => {
        if (selectedItem) {
            props.onAdd?.();
            setSelectedItem(null);
        }
    };

    const handleCancel = () => {
        setSelectedItem(null);
        props.onCancel?.();
        props.form?.setFieldsValue({ [props.name]: undefined });
    };
    return (
        <div style={{ width: '100%' }}>
            <Row gutter={[16, 0]} wrap={false}>
                <Col flex={'auto'}>
                    <Form.Item
                        id={props.formName}
                        name={props.name}
                        rules={props.required ? [{ required: true }] : []}
                        label={
                            props.label ? <div className={'form_label'}>{props.label}</div> : null
                        }
                        style={{ marginBottom: props.marginBottom ?? 16 }}
                        required={false}
                    >
                        <Select
                            size={'large'}
                            className={`select_widget ${props.disable && 'disable'}`}
                            disabled={props.disable}
                            allowClear={props.allowClear}
                            onFocus={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    'var(--button-secondary-hover)';
                                props.onFocus?.();
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                props.onBlur?.();
                            }}
                            maxTagCount={props.oneLine ? 'responsive' : undefined}
                            mode={props.multiply ? 'multiple' : undefined}
                            showSearch
                            style={{
                                width: '100%',
                                borderRadius: 'var(--basic-border-radius)',
                            }}
                            placeholder={props.placeholder}
                            filterOption={(input, option) => {
                                if (typeof option?.label === 'string') {
                                    return (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase());
                                }
                                return false;
                            }}
                            options={props.items.sort((a, b) => a.value - b.value)}
                            optionRender={(option) => <Space>{option.label}</Space>}
                            onChange={(value) => handleItemSelect(value)}
                        />
                    </Form.Item>
                </Col>
                {props.extra ? <Col>{props.extra}</Col> : null}
                {props.showButtonsAndDescription && showButtons && (
                    <Row gutter={[2, 0]} wrap={false}>
                        <Col>
                            <CustomButton
                                imgSrc={OkayImg}
                                width={38}
                                height={38}
                                onClick={handleAddItem}
                            />
                        </Col>
                        <Col>
                            <CustomButton
                                imgSrc={CloseImg}
                                danger
                                variant="solid"
                                width={38}
                                height={38}
                                color="danger"
                                className={'modal_btn_cancel'}
                                onClick={handleCancel}
                            />
                        </Col>
                    </Row>
                )}
            </Row>
        </div>
    );
};

export default FormItemSelect;
