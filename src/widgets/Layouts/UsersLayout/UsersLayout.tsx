import { FC, ReactNode } from 'react';

import './styles.css';

interface UsersLayoutProps {
    header: ReactNode;
    body: ReactNode;
    sidebar: ReactNode;
}

/**
 * Компонент шаблона для страницы Users.
 *
 * @component
 * @param {UsersLayoutProps} props - Свойства компонента.
 * @param {ReactNode} props.header - Header страницы Users.
 * @param {ReactNode} props.body - Body страницы Users.
 * @param {ReactNode} props.sidebar - Sidebar страницы Users.
 * @returns {FC} - Возвращает компонент шаблона страницы Users.
 */
const UsersLayout: FC<UsersLayoutProps> = (props) => {
    const { header, body, sidebar } = props;

    return (
        <div className="users_layout">
            <div>{sidebar}</div>
            <div className="users_layout_content">
                <div className="users_layout_header">{header}</div>
                <div className="users_layout_body">{body}</div>
            </div>
        </div>
    );
};

export default UsersLayout;
