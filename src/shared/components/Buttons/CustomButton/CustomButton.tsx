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
 * Компонент кастомной кнопки
 *
 * @component
 * @param {CustomButtonProps} props - Свойства компонента.
 * @param {string} props.imgSrc - URL изображения, которое будет отображаться на кнопке.
 * @return {FC} - Возвращает компонент кнопки с изображением.
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
