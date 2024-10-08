import { FC, ReactNode } from 'react';

import './styles.css';

interface TableLayoutProps {
    header: ReactNode;
    body: ReactNode;
}

/**
 * Компонент шаблона для компонента таблицы.
 *
 * @component
 * @param {TableLayoutProps} props - Свойства компонента.
 * @param {ReactNode} props.header - Header компонента таблицы.
 * @param {ReactNode} props.body - Body компонента таблицы.
 * @returns {FC} - Возвращает компонент шаблона таблицы.
 */
const TableLayout: FC<TableLayoutProps> = (props) => {
    const { header, body } = props;

    return (
        <div className="table_layout">
            <div className="table_layout_footer">{header}</div>
            <div className="table_layout_body">{body}</div>
        </div>
    );
};

export default TableLayout;
