import { FC } from 'react';
import CustomButton from '../../../../shared/components/Buttons/CustomButton/CustomButton';

import FilterImg from 'app/assets/icons/Filter.png';
import PlusImg from 'app/assets/icons/Plus.png';
import SettingsImg from 'app/assets/icons/Settings.png';
import SearchImg from 'app/assets/icons/Search.png';

import './styles.css';
import { Input } from 'antd';

interface UsersHeaderProps {}

const UsersHeader: FC<UsersHeaderProps> = (props) => {
    const {} = props;

    return (
        <div className={'users_header'}>
            <div className={'users_header_left'}>
                <div className={'users_header_left_text'}>Пользователи</div>
                <div className={'users_header_left_text users_header_left_count'}>(30)</div>
                <CustomButton imgSrc={PlusImg} />
            </div>
            <div className={'users_header_right'}>
                <Input
                    className="users_header_right_input"
                    placeholder="Поиск"
                    suffix={<img src={SearchImg} alt="searchIcon" />}
                />

                <CustomButton imgSrc={FilterImg} />
                <CustomButton imgSrc={SettingsImg} />
            </div>
        </div>
    );
};

export default UsersHeader;
