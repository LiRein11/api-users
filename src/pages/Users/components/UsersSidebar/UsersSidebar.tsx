import { FC } from 'react';

import './styles.css';

interface UsersSidebarProps {}

const UsersSidebar: FC<UsersSidebarProps> = (props) => {
    const {} = props;

    return <div className={'users_sidebar'}>Sidebar</div>;
};

export default UsersSidebar;
