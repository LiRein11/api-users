import { FC, ReactNode } from 'react';

import './styles.css';
import { Modal } from 'antd';

interface ModalWidgetProps {
    children: ReactNode;
    onClose?: () => void;
    open: boolean;
    title?: string;
    width?: string | number;
    centered?: boolean;
    closable?: boolean;
}

/**
 * Лайаут модалки
 *
 * @component
 * @param {ModalWidgetProps} props - Свойства компонента.
 * @param {string} props.imgSrc - Путь к картинке.
 * @returns {FC} - Возвращает шаблон модалки.
 */
const ModalWidget: FC<ModalWidgetProps> = (props) => {
    const { children, onClose, title, open, width, centered = false, closable = true } = props;

    return (
        <Modal
            onCancel={onClose}
            title={<div className="modal_header">{title}</div>}
            centered={centered}
            closable // todo
            destroyOnClose
            key={title}
            width={width ?? 616}
            open={open}
            footer={<div />}
        >
            {children}
        </Modal>
    );
};

export default ModalWidget;
