import { FC } from 'react';

import './styles.css';
import { Button } from 'antd';

interface CustomButtonProps {
    imgSrc: string;
}

const CustomButton: FC<CustomButtonProps> = (props) => {
    const { imgSrc } = props;

    return (
        <Button className="custom-button">
            <img
                src={imgSrc} // Замените на URL вашего изображения
                alt="icon"
                style={{ width: 12, height: 12 }}
            />
        </Button>
    );
};

export default CustomButton;
