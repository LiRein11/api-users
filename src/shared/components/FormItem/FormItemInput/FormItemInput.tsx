import { Col, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import isNumeric from 'antd/es/_util/isNumeric';
import './style.css';
import { FormItemProps } from '../../../model/types/FormItemProps';

/**
 * Перечисление типов ввода.
 *
 * @enum {number}
 */
export enum InputTypeEnum {
    textArea,
    password,
}

/**
 * Перечисление форматов ввода.
 *
 * @enum {number}
 */
export enum InputFormatEnum {
    number,
}

/**
 * Интерфейс свойств компонента FormItemInput.
 *
 * @interface FormItemInputProps
 * @extends {FormItemProps}
 * @property {string} [placeHolder] - Плейсхолдер для поля ввода.
 * @property {InputTypeEnum} [type] - Тип поля ввода.
 * @property {number} [rows] - Количество строк для многострочного поля ввода.
 * @property {number} [maxLength] - Максимальная длина вводимого текста.
 * @property {number} [minLength] - Минимальная длина вводимого текста.
 * @property {InputFormatEnum} [format] - Формат вводимого текста.
 * @property {boolean} [disable] - Флаг, указывающий, отключено ли поле ввода.
 */
export interface FormItemInputProps extends FormItemProps {
    placeHolder?: string;
    type?: InputTypeEnum;
    rows?: number;
    maxLength?: number;
    minLength?: number;
    format?: InputFormatEnum;
    disable?: boolean;
}

/**
 * Компонент формы Input, который представляет собой элемент формы с полем ввода.
 *
 * @component
 * @param {FormItemInputProps} props - Свойства компонента.
 * @param {string} props.formName - Имя формы, к которой принадлежит элемент.
 * @param {string} props.name - Имя элемента формы.
 * @param {string} [props.label] - Метка элемента формы.
 * @param {boolean} [props.required] - Флаг, указывающий, является ли элемент обязательным.
 * @param {number} [props.marginBottom] - Нижний отступ элемента формы.
 * @param {string} [props.placeHolder] - Плейсхолдер для поля ввода.
 * @param {InputTypeEnum} [props.type] - Тип поля ввода.
 * @param {number} [props.rows] - Количество строк для многострочного поля ввода.
 * @param {number} [props.maxLength] - Максимальная длина вводимого текста.
 * @param {number} [props.minLength] - Минимальная длина вводимого текста.
 * @param {InputFormatEnum} [props.format] - Формат вводимого текста.
 * @param {boolean} [props.disable] - Флаг, указывающий, отключено ли поле ввода.
 * @returns {FC} - Возвращает компонент формы Input.
 */
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
