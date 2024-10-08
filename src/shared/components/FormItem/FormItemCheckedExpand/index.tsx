import React, { FC, ReactNode } from 'react';
import { Checkbox, Form } from 'antd';
import { FormItemProps } from '../../../model/types/FormItemProps';

/**
 * Интерфейс свойств компонента FormItemCheckedExpand.
 *
 * @interface FormItemCheckedExpandProps
 * @extends {FormItemProps}
 * @property {ReactNode} [children] - Дочерние элементы, которые будут отображаться при выборе чекбокса.
 */
interface FormItemCheckedExpandProps extends FormItemProps {
    children?: ReactNode;
}

/**
 * Компонент формы CheckedExpand, который представляет собой элемент формы с чекбоксом и расширяемым контентом.
 *
 * @component
 * @param {FormItemCheckedExpandProps} props - Свойства компонента.
 * @param {string} props.formName - Имя формы, к которой принадлежит элемент.
 * @param {string} props.name - Имя элемента формы.
 * @param {string} [props.label] - Метка элемента формы.
 * @param {ReactNode} [props.children] - Дочерние элементы, которые будут отображаться при выборе чекбокса.
 * @returns {FC} - Возвращает компонент формы CheckedExpand.
 */
const FormItemCheckedExpand: FC<FormItemCheckedExpandProps> = (props) => {
    return (
        <div>
            <Form.Item
                id={props.formName}
                name={props.name}
                valuePropName="checked"
                style={{ marginBottom: 0 }}
            >
                <Checkbox>
                    <h4>{props.label}</h4>
                </Checkbox>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) => {
                    return prevValues[props.name] !== curValues[props.name];
                }}
            >
                {({ getFieldValue }) => {
                    return (
                        <div style={{ display: getFieldValue(props.name) ? undefined : 'none' }}>
                            {props.children}
                        </div>
                    );
                }}
            </Form.Item>
        </div>
    );
};

export default FormItemCheckedExpand;
