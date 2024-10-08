import React, { FC } from 'react';
import { Col, Form, Row, Slider } from 'antd';
import { FormItemProps } from '../../../model/types/FormItemProps';

/**
 * Интерфейс для описания статусов слайдера.
 *
 * @interface StatusesSlider
 * @property {number} id - Уникальный идентификатор статуса.
 * @property {string} label - Метка статуса.
 * @property {object} interval - Интервал значений, связанных с этим статусом.
 * @property {number} [interval.min] - Минимальное значение интервала.
 * @property {number} [interval.max] - Максимальное значение интервала.
 */
interface StatusesSlider {
    id: number;
    label: string;
    interval: {
        min?: number;
        max?: number;
    };
}

/**
 * Интерфейс свойств компонента FormItemSlider.
 *
 * @interface FormItemSliderProps
 * @extends {FormItemProps}
 * @property {number} [step] - Шаг изменения значения слайдера.
 * @property {number} [min] - Минимальное значение слайдера.
 * @property {number} max - Максимальное значение слайдера.
 * @property {function} [labelRender] - Функция для рендеринга метки слайдера.
 * @property {StatusesSlider[]} [statuses] - Массив статусов слайдера.
 */
interface FormItemSliderProps extends FormItemProps {
    step?: number;
    min?: number;
    max: number;
    labelRender?: (current: number) => string;
    statuses?: StatusesSlider[];
}

/**
 * Компонент формы Slider, который представляет собой элемент формы с ползунком.
 *
 * @component
 * @param {FormItemSliderProps} props - Свойства компонента.
 * @param {string} props.formName - Имя формы, к которой принадлежит элемент.
 * @param {string} props.name - Имя элемента формы.
 * @param {string} [props.label] - Метка элемента формы.
 * @param {number} [props.step] - Шаг изменения значения слайдера.
 * @param {number} [props.min] - Минимальное значение слайдера.
 * @param {number} props.max - Максимальное значение слайдера.
 * @param {function} [props.labelRender] - Функция для рендеринга метки слайдера.
 * @param {StatusesSlider[]} [props.statuses] - Массив статусов слайдера.
 * @returns {FC} - Возвращает компонент.
 */
const FormItemSlider: FC<FormItemSliderProps> = (props) => {
    /**
     * Определяет статус слайдера на основе текущего значения.
     *
     * @param {number} value - Текущее значение слайдера.
     * @returns {string | undefined} - Метка статуса или undefined, если статус не найден.
     */
    const sliderStatus = (value: number) => {
        let status = props.statuses?.find((status) => {
            if (status.interval.min !== undefined && status.interval.max !== undefined) {
                return value > status.interval.min && value <= status.interval.max;
            } else if (status.interval.min !== undefined) {
                return value > status.interval.min;
            } else if (status.interval.max !== undefined) {
                return value <= status.interval.max;
            }
            return false;
        });
        return status?.label;
    };

    return (
        <div style={{ padding: '0 16px' }}>
            {props.label ? <h4 className={'form_label'}>{props.label}</h4> : null}
            <Row gutter={[16, 0]} wrap={false}>
                <Col flex={'auto'}>
                    <Form.Item
                        id={props.formName}
                        name={props.name}
                        rules={props.required ? [{ required: true }] : []}
                    >
                        <Slider
                            min={props.min}
                            max={props.max}
                            marks={Array.from(
                                { length: props.max / (props.step ?? 1) + 1 },
                                (_, i) => i,
                            ).reduce(
                                (acc, currentValue) => ({
                                    ...acc,
                                    [currentValue * (props.step ?? 1)]: props.labelRender
                                        ? props.labelRender(currentValue * (props.step ?? 1))
                                        : `${currentValue * (props.step ?? 1)}`,
                                }),
                                {},
                            )}
                        />
                    </Form.Item>
                </Col>
                {props.extra ? <Col>{props.extra}</Col> : null}
            </Row>
        </div>
    );
};

export default FormItemSlider;
