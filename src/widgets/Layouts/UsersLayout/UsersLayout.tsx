import { FC, ReactNode } from 'react';

import './styles.css';

interface UsersLayoutProps {
    header: ReactNode;
    body: ReactNode;
    sidebar: ReactNode;
}

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
