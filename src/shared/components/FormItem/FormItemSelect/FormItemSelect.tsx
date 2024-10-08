import React, { FC, ReactNode } from 'react';
import { Col, Form, Row, Select, Space } from 'antd';
import { FormItemProps } from '../../../model/types/FormItemProps';

/**
 * Интерфейс для описания опций выпадающего списка.
 *
 * @interface ISelectOption
 * @property {any} value - Значение опции.
 * @property {ReactNode} label - Метка опции.
 */
export interface ISelectOption {
    value: any;
    label: ReactNode;
}

/**
 * Интерфейс свойств компонента FormItemSelect.
 *
 * @interface FormItemSelectProps
 * @extends {FormItemProps}
 * @property {function} [callBack] - Функция обратного вызова при изменении значения.
 * @property {string} [placeholder] - Плейсхолдер для выпадающего списка.
 * @property {ISelectOption[]} items - Массив опций выпадающего списка.
 * @property {boolean} [multiply] - Флаг, указывающий, можно ли выбирать несколько опций.
 * @property {boolean} [allowClear] - Флаг, указывающий, можно ли очистить выбранное значение.
 * @property {boolean} [oneLine] - Флаг, указывающий, должны ли опции отображаться в одну строку.
 */
export interface FormItemSelectProps extends FormItemProps {
    callBack?: (value: any) => void;
    placeholder?: string;
    items: ISelectOption[];
    multiply?: boolean;
    showCode?: boolean;
    allowClear?: boolean;
    oneLine?: boolean;
}

/**
 * Компонент формы Select, который представляет собой элемент формы с выпадающим списком.
 *
 * @component
 * @param {FormItemSelectProps} props - Свойства компонента.
 * @param {string} props.formName - Имя формы, к которой принадлежит элемент.
 * @param {string} props.name - Имя элемента формы.
 * @param {string} [props.label] - Метка элемента формы.
 * @param {boolean} [props.required] - Флаг, указывающий, является ли элемент обязательным.
 * @param {number} [props.marginBottom] - Нижний отступ элемента формы.
 * @param {function} [props.callBack] - Функция обратного вызова при изменении значения.
 * @param {string} [props.placeholder] - Плейсхолдер для выпадающего списка.
 * @param {ISelectOption[]} props.items - Массив опций выпадающего списка.
 * @param {boolean} [props.multiply] - Флаг, указывающий, можно ли выбирать несколько опций.
 * @param {boolean} [props.allowClear] - Флаг, указывающий, можно ли очистить выбранное значение.
 * @param {boolean} [props.oneLine] - Флаг, указывающий, должны ли опции отображаться в одну строку.
 * @returns {FC} - Возвращает компонент формы Select.
 */
const FormItemSelect: FC<FormItemSelectProps> = (props) => {
    return (
        <div style={{ width: '100%' }}>
            <Row gutter={[16, 0]} wrap={false}>
                <Col flex={'auto'}>
                    <Form.Item
                        shouldUpdate
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
                            onChange={(value) =>
                                props.callBack?.(props.items.find((item) => item.value === value))
                            }
                            // value={}
                        />
                    </Form.Item>
                </Col>
                {props.extra ? <Col>{props.extra}</Col> : null}
                {/*{props.showButtonsAndDescription && showButtons && (*/}
                {/*    <Row gutter={[2, 0]} wrap={false}>*/}
                {/*        <Col>*/}
                {/*            <CustomButton*/}
                {/*                imgSrc={OkayImg}*/}
                {/*                width={38}*/}
                {/*                height={38}*/}
                {/*                onClick={() => setOpenAdd(true)}*/}
                {/*            />*/}
                {/*        </Col>*/}
                {/*        <Col>*/}
                {/*            <CustomButton*/}
                {/*                imgSrc={CloseImg}*/}
                {/*                danger*/}
                {/*                variant="solid"*/}
                {/*                width={38}*/}
                {/*                height={38}*/}
                {/*                color="danger"*/}
                {/*                className={'modal_btn_cancel'}*/}
                {/*                onClick={handleCancel}*/}
                {/*            />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*)}*/}
            </Row>
        </div>
    );
};

export default FormItemSelect;
