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
 * Компонент модального окна, который представляет собой шаблон для модальных окон.
 *
 * @component
 * @param {ModalWidgetProps} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние элементы, которые будут отображаться внутри модального окна.
 * @param {() => void} [props.onClose] - Функция, вызываемая при закрытии модального окна.
 * @param {boolean} props.open - Флаг, указывающий, открыто ли модальное окно.
 * @param {string} [props.title] - Заголовок модального окна.
 * @param {string | number} [props.width] - Ширина модального окна.
 * @param {boolean} [props.centered] - Флаг, указывающий, должно ли модальное окно быть центрировано.
 * @param {boolean} [props.closable] - Флаг, указывающий, должна ли быть кнопка закрытия модального окна.
 * @returns {FC} - Возвращает компонент модального окна.
 */
const ModalWidget: FC<ModalWidgetProps> = (props) => {
    const { children, onClose, title, open, width, centered = false, closable = true } = props;

    return (
        <Modal
            onCancel={onClose}
            title={<div className="modal_header">{title}</div>}
            centered={centered}
            closable
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
