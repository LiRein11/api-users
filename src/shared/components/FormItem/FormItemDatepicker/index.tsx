import React, { FC } from 'react';
import { Col, DatePicker, Form, Row } from 'antd';
import { FormItemProps } from '../../../model/types/FormItemProps';

/**
 * Интерфейс свойств компонента FormItemDatepicker.
 *
 * @interface FormItemDatepickerProps
 * @extends {FormItemProps}
 * @property {boolean} [onlyYear] - Флаг, указывающий, что выбор даты ограничен только годом.
 * @property {boolean} [showTime] - Флаг, указывающий, отображать ли время в выборе даты.
 * @property {boolean} [range] - Флаг, указывающий, что выбор даты должен быть диапазоном.
 * @property {string} [placeholder] - Плейсхолдер для поля выбора даты.
 */
export interface FormItemDatepickerProps extends FormItemProps {
    onlyYear?: boolean;
    showTime?: boolean;
    range?: boolean;
    placeholder?: string;
}

/**
 * Компонент формы Datepicker, который представляет собой элемент формы с выбором даты.
 *
 * @component
 * @param {FormItemDatepickerProps} props - Свойства компонента.
 * @param {string} props.formName - Имя формы, к которой принадлежит элемент.
 * @param {string} props.name - Имя элемента формы.
 * @param {string} [props.label] - Метка элемента формы.
 * @param {boolean} [props.required] - Флаг, указывающий, является ли элемент обязательным.
 * @param {number} [props.marginBottom] - Нижний отступ элемента формы.
 * @param {boolean} [props.onlyYear] - Флаг, указывающий, что выбор даты ограничен только годом.
 * @param {boolean} [props.showTime] - Флаг, указывающий, отображать ли время в выборе даты.
 * @param {boolean} [props.range] - Флаг, указывающий, что выбор даты должен быть диапазоном.
 * @param {string} [props.placeholder] - Плейсхолдер для поля выбора даты.
 * @returns {FC} - Возвращает компонент формы Datepicker.
 */
const FormItemDatepicker: FC<FormItemDatepickerProps> = (props) => {
    return (
        <Row gutter={[16, 0]} wrap={false}>
            <Col flex={'auto'}>
                <Form.Item
                    id={props.formName}
                    name={props.name}
                    label={props.label ? <h4 className={'form_label'}>{props.label}</h4> : null}
                    rules={props.required ? [{ required: true }] : []}
                >
                    {props.range ? (
                        <DatePicker.RangePicker showTime={props.showTime} />
                    ) : (
                        <DatePicker
                            placeholder={props.placeholder}
                            picker={props.onlyYear ? 'year' : undefined}
                            style={{ width: '100%' }}
                            showTime={props.showTime}
                        />
                    )}
                </Form.Item>
            </Col>
            {props.extra ? <Col>{props.extra}</Col> : null}
        </Row>
    );
};

export default FormItemDatepicker;
