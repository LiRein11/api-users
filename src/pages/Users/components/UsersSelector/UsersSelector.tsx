import React, { FC } from 'react';

import './styles.css';
import UsersCreateForm from '../UsersCreateForm/UsersCreateForm';
import ModalWidget from '../../../../widgets/Layouts/ModalWidget/ModalWidget';
import IUser from '../../../../app/api/entites/User/IUser';

interface UsersSelectorProps {
    open: boolean;
    onClose: () => void;
    onSave: (user: IUser) => void;
}

const UsersSelector: FC<UsersSelectorProps> = (props) => {
    const { open, onClose, onSave } = props;

    return (
        <ModalWidget title={'Добавить пользователя'} open={open} onClose={onClose} width={616}>
            <UsersCreateForm onSave={onSave} />
        </ModalWidget>
    );
};

export default UsersSelector;
