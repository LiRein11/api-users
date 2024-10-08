import React, { FC, ReactNode } from 'react';
import { Col, Form, Row, Segmented } from 'antd';
import { FormItemProps } from '../../../model/types/FormItemProps';

/**
 * Интерфейс для описания опций сегментированного контрола.
 *
 * @interface ISelectOption
 * @property {any} value - Значение опции.
 * @property {ReactNode} label - Метка опции.
 */
interface ISelectOption {
    value: any;
    label: ReactNode;
}

/**
 * Интерфейс свойств компонента FormItemSegmented.
 *
 * @interface FormItemSegmentedProps
 * @extends {FormItemProps}
 * @property {boolean} [block] - Флаг, указывающий, должен ли сегментированный контрол занимать всю доступную ширину.
 * @property {ISelectOption[]} items - Массив опций сегментированного контрола.
 */
interface FormItemSegmentedProps extends FormItemProps {
    block?: boolean;
    items: ISelectOption[];
}

/**
 * Компонент формы Segmented, который представляет собой элемент формы с сегментированным контролом.
 *
 * @component
 * @param {FormItemSegmentedProps} props - Свойства компонента.
 * @param {string} props.formName - Имя формы, к которой принадлежит элемент.
 * @param {string} props.name - Имя элемента формы.
 * @param {string} [props.label] - Метка элемента формы.
 * @param {number} [props.marginBottom] - Нижний отступ элемента формы.
 * @param {boolean} [props.block] - Флаг, указывающий, должен ли сегментированный контрол занимать всю доступную ширину.
 * @param {ISelectOption[]} props.items - Массив опций сегментированного контрола.
 * @returns {FC} - Возвращает компонент формы Segmented.
 */
const FormItemSegmented: FC<FormItemSegmentedProps> = (props) => {
    return (
        <Row wrap={false} style={{ width: '100%' }}>
            {props.label && (
                <Col flex={'168px'}>
                    <div className={'form_label one_line'} style={{ paddingTop: 6 }}>
                        {props.label} :
                    </div>
                </Col>
            )}
            <Col flex={'auto'}>
                <Form.Item
                    id={props.formName}
                    name={props.name}
                    style={{
                        width: '100%',
                        marginBottom: props.marginBottom,
                    }}
                >
                    <Segmented options={props.items} block={props.block} />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormItemSegmented;
