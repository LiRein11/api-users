import { FC, ReactNode } from 'react';

import './styles.css';

interface TableLayoutProps {
    header: ReactNode;
    body: ReactNode;
}

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
