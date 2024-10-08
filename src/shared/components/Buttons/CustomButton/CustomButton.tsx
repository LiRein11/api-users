import { FC } from 'react';

import './styles.css';
import { Button, ButtonProps } from 'antd';

interface CustomButtonProps extends ButtonProps {
    imgSrc?: string;
    className?: string;
    text?: string;
    width?: number;
    height?: number;
}

/**
 * Компонент кастомной кнопки, который расширяет стандартную кнопку Ant Design.
 *
 * @component
 * @param {CustomButtonProps} props - Свойства компонента.
 * @param {string} [props.imgSrc] - URL изображения, которое будет отображаться на кнопке.
 * @param {string} [props.className] - Класс для стилизации кнопки.
 * @param {string} [props.text] - Текст, который будет отображаться на кнопке.
 * @param {number} [props.width] - Ширина кнопки.
 * @param {number} [props.height] - Высота кнопки.
 * @returns {FC} - Возвращает компонент кнопки с изображением и текстом.
 */
const CustomButton: FC<CustomButtonProps> = (props) => {
    const { imgSrc, className, text, width, height, ...buttonProps } = props;

    return (
        <Button
            className={className ? className : 'custom-button'}
            {...buttonProps}
            style={{ width: width, height: height }}
        >
            {imgSrc && <img src={imgSrc} alt="icon" style={{ width: 12, height: 12 }} />}
            {text && text}
        </Button>
    );
};

export default CustomButton;
