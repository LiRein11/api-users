import { FC } from 'react';

import './styles.css';

interface UsersTableHeaderProps {}

const UsersTableHeader: FC<UsersTableHeaderProps> = (props) => {
    const {} = props;

    return (
        <div className="table_header">
            <div className="checkbox_column">
                <input style={{ width: 16, height: 16 }} type="checkbox" />
            </div>
            <div>Пользователь</div>
            <div>ФИО</div>
            <div>ИИН</div>
            <div>Роль</div>
        </div>
    );
};

export default UsersTableHeader;
