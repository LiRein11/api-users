import { FC, ReactNode } from 'react';

import './styles.css';

interface ModalWidgetProps {
    header: string;
    children: ReactNode;
    onClose?: () => void;
}

/**
 * Компонент
 *
 * @component
 * @param {ModalWidgetProps} props - Свойства компонента.
 * @param {string} props.imgSrc - .
 * @returns {FC} - Возвращает шаблон модалки.
 */
const ModalWidget: FC<ModalWidgetProps> = (props) => {
    const { header, children, onClose } = props;

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <div className="modal_header">{header}</div>
                <div className="modal_body">{children}</div>
            </div>
        </div>
    );
};

export default ModalWidget;
