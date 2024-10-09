import React, { FC, useEffect, useState } from 'react';

import './styles.css';
import UsersCreateForm from '../UsersCreateForm/UsersCreateForm';
import ModalWidget from '../../../../widgets/Layouts/ModalWidget/ModalWidget';
import IUser from '../../../../app/api/entites/User/IUser';
import FormItemSelect, {
    ISelectOption,
} from '../../../../shared/components/FormItem/FormItemSelect/FormItemSelect';
import CustomButton from '../../../../shared/components/Buttons/CustomButton/CustomButton';
import PlusImg from '../../../../app/assets/icons/Plus.png';
import { Col, Row, Spin } from 'antd';
import { FormItemProps, FormProps } from '../../../../shared/model/types/FormItemProps';
import useUsersSelectorStore from './api/store';
import useUsersStore from '../../api/store';

interface UsersSelectorProps extends FormItemProps {
    multiply?: boolean;
}

const UsersSelector: FC<UsersSelectorProps> = (props) => {
    const { multiply = false, form } = props;
    const { users, setIsOpenAdd, isOpenAdd, getUsersAll, loading } = useUsersSelectorStore();
    const { isUpdated, setIsUpdated } = useUsersStore();

    const onSave = (newUser: IUser) => {
        setIsOpenAdd(false); // todo

        form.setFieldsValue({
            [props.name]: multiply ? [...form.getFieldValue(props.name), 2427] : 2427,
        });
    };

    useEffect(() => {
        getUsersAll({ active_only: true }, false);
    }, []);

    useEffect(() => {
        getUsersAll({ active_only: true }, isUpdated);
        setIsUpdated(false);
    }, [isUpdated]);

    return (
        <>
            <ModalWidget
                title={'Добавить пользователя'}
                open={isOpenAdd}
                onClose={() => setIsOpenAdd(false)}
                width={616}
            >
                <UsersCreateForm onSave={(user) => onSave(user)} />
            </ModalWidget>
            <Row wrap={false}>
                <Col flex={'auto'}>
                    <Spin style={{ width: '100%' }} spinning={loading}>
                        <FormItemSelect
                            items={users.map((user) => ({
                                value: user.id,
                                label: user.fio,
                            }))}
                            {...props}
                        />
                    </Spin>
                </Col>
                <Col>
                    <CustomButton
                        imgSrc={PlusImg}
                        width={38}
                        height={38}
                        onClick={() => setIsOpenAdd(true)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default UsersSelector;
